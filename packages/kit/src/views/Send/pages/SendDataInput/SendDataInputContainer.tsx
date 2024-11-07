/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRoute } from '@react-navigation/core';
import BigNumber from 'bignumber.js';
import { isNaN, isNil } from 'lodash';
import { useIntl } from 'react-intl';

import {
  Form,
  Input,
  Page,
  SizableText,
  TextArea,
  XStack,
  useForm,
  useMedia,
} from '@onekeyhq/components';
import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import { AccountSelectorProviderMirror } from '@onekeyhq/kit/src/components/AccountSelector';
import {
  AddressInput,
  type IAddressInputValue,
} from '@onekeyhq/kit/src/components/AddressInput';
import { AmountInput } from '@onekeyhq/kit/src/components/AmountInput';
import { ListItem } from '@onekeyhq/kit/src/components/ListItem';
import { Token } from '@onekeyhq/kit/src/components/Token';
import { useAccountData } from '@onekeyhq/kit/src/hooks/useAccountData';
import useAppNavigation from '@onekeyhq/kit/src/hooks/useAppNavigation';
import { usePromiseResult } from '@onekeyhq/kit/src/hooks/usePromiseResult';
import { useSendConfirm } from '@onekeyhq/kit/src/hooks/useSendConfirm';
import {
  useAllTokenListAtom,
  useAllTokenListMapAtom,
} from '@onekeyhq/kit/src/states/jotai/contexts/tokenList';
import { getFormattedNumber } from '@onekeyhq/kit/src/utils/format';
import { useSettingsPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import type { ITransferInfo } from '@onekeyhq/kit-bg/src/vaults/types';
import { OneKeyError, OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import errorToastUtils from '@onekeyhq/shared/src/errors/utils/errorToastUtils';
import errorUtils from '@onekeyhq/shared/src/errors/utils/errorUtils';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { defaultLogger } from '@onekeyhq/shared/src/logger/logger';
import {
  EAssetSelectorRoutes,
  EModalRoutes,
} from '@onekeyhq/shared/src/routes';
import type {
  EModalSendRoutes,
  IModalSendParamList,
} from '@onekeyhq/shared/src/routes';
import accountUtils from '@onekeyhq/shared/src/utils/accountUtils';
import hexUtils from '@onekeyhq/shared/src/utils/hexUtils';
import { EAccountSelectorSceneName } from '@onekeyhq/shared/types';
import type { INetworkAccount } from '@onekeyhq/shared/types/account';
import {
  EDeriveAddressActionType,
  EInputAddressChangeType,
} from '@onekeyhq/shared/types/address';
import type { IAccountNFT } from '@onekeyhq/shared/types/nft';
import { ENFTType } from '@onekeyhq/shared/types/nft';
import type { IToken, ITokenFiat } from '@onekeyhq/shared/types/token';

import { showBalanceDetailsDialog } from '../../../Home/components/BalanceDetailsDialog';
import { HomeTokenListProviderMirror } from '../../../Home/components/HomeTokenListProvider/HomeTokenListProviderMirror';

import type { RouteProp } from '@react-navigation/core';

function SendDataInputContainer() {
  const intl = useIntl();
  const media = useMedia();

  const [isUseFiat, setIsUseFiat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMaxSend, setIsMaxSend] = useState(false);
  const [settings] = useSettingsPersistAtom();
  const navigation = useAppNavigation();

  const [allTokens] = useAllTokenListAtom();
  const [map] = useAllTokenListMapAtom();

  const addressInputChangeType = useRef(EInputAddressChangeType.Manual);

  const route =
    useRoute<RouteProp<IModalSendParamList, EModalSendRoutes.SendDataInput>>();

  const { serviceNFT, serviceToken } = backgroundApiProxy;

  const {
    networkId,
    accountId,
    isNFT,
    token,
    nfts,
    address,
    amount: sendAmount = '',
    onSuccess,
    onFail,
    onCancel,
    isAllNetworks,
  } = route.params;
  const nft = nfts?.[0];
  const [tokenInfo, setTokenInfo] = useState(token);

  const [currentAccount, setCurrentAccount] = useState({
    accountId,
    networkId,
  });

  const { account, network } = useAccountData({
    accountId: currentAccount.accountId,
    networkId: currentAccount.networkId,
  });
  const sendConfirm = useSendConfirm({
    accountId: currentAccount.accountId,
    networkId: currentAccount.networkId,
  });

  const isSelectTokenDisabled = allTokens.tokens.length <= 1;

  const tokenMinAmount = useMemo(() => {
    if (!tokenInfo || isNaN(tokenInfo.decimals)) {
      return 0;
    }

    return new BigNumber(1).shiftedBy(-tokenInfo.decimals).toFixed();
  }, [tokenInfo]);

  const {
    result: [
      tokenDetails,
      nftDetails,
      vaultSettings,
      hasFrozenBalance,
      displayMemoForm,
      displayPaymentIdForm,
      memoMaxLength,
      numericOnlyMemo,
      displayNoteForm,
      noteMaxLength,
    ] = [],
    isLoading: isLoadingAssets,
  } = usePromiseResult(
    async () => {
      if (!account || !network) return;
      if (!token && !nft) {
        throw new OneKeyInternalError('token and nft info are both missing.');
      }

      let nftResp: IAccountNFT[] | undefined;
      let tokenResp:
        | ({
            info: IToken;
          } & ITokenFiat)[]
        | undefined;

      if (isNFT && nft) {
        nftResp = await serviceNFT.fetchNFTDetails({
          accountId: account.id,
          networkId: network.id,
          nfts: [
            {
              collectionAddress: nft.collectionAddress,
              itemId: nft.itemId,
            },
          ],
        });
      } else if (!isNFT && tokenInfo) {
        const checkInscriptionProtectionEnabled =
          await backgroundApiProxy.serviceSetting.checkInscriptionProtectionEnabled(
            {
              networkId: network.id,
              accountId: account.id,
            },
          );
        const withCheckInscription =
          checkInscriptionProtectionEnabled && settings.inscriptionProtection;
        tokenResp = await serviceToken.fetchTokensDetails({
          networkId: network.id,
          accountId: account.id,
          contractList: [tokenInfo.address],
          withFrozenBalance: true,
          withCheckInscription,
        });
      }

      const vs = await backgroundApiProxy.serviceNetwork.getVaultSettings({
        networkId: network.id,
      });

      const frozenBalanceSettings =
        await backgroundApiProxy.serviceSend.getFrozenBalanceSetting({
          networkId: network.id,
          tokenDetails: tokenResp?.[0],
        });

      return [
        tokenResp?.[0],
        nftResp?.[0],
        vs,
        frozenBalanceSettings,
        vs.withMemo,
        vs.withPaymentId,
        vs.memoMaxLength,
        vs.numericOnlyMemo,
        vs.withNote,
        vs.noteMaxLength,
      ];
    },
    [
      account,
      isNFT,
      network,
      nft,
      serviceNFT,
      serviceToken,
      token,
      tokenInfo,
      settings.inscriptionProtection,
    ],
    { watchLoading: true, alwaysSetState: true },
  );

  const { result: addressBookEnabledNetworkIds } = usePromiseResult(
    async () => {
      const networks =
        await backgroundApiProxy.serviceNetwork.getAddressBookEnabledNetworks();
      return networks.map((o) => o.id);
    },
    [],
    { initResult: [] },
  );

  if (tokenDetails && isNil(tokenDetails?.balanceParsed)) {
    tokenDetails.balanceParsed = new BigNumber(tokenDetails.balance)
      .shiftedBy(tokenDetails.info.decimals * -1)
      .toFixed();
  }
  const currencySymbol = settings.currencyInfo.symbol;
  const tokenSymbol = tokenDetails?.info.symbol ?? '';

  const form = useForm({
    defaultValues: {
      to: { raw: address } as IAddressInputValue,
      amount: sendAmount,
      nftAmount: sendAmount || '1',
      memo: '',
      paymentId: '',
      note: '',
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  // token amount or fiat amount
  const amount = form.watch('amount');
  const toPending = form.watch('to.pending');
  const toResolved = form.watch('to.resolved');
  const nftAmount = form.watch('nftAmount');

  const linkedAmount = useMemo(() => {
    let amountBN = new BigNumber(amount ?? 0);
    amountBN = amountBN.isNaN() ? new BigNumber(0) : amountBN;

    const tokenPrice = tokenDetails?.price;
    const tokenDecimals = tokenDetails?.info.decimals;

    if (isNil(tokenPrice) || isNil(tokenDecimals))
      return {
        amount: '0',
        originalAmount: '0',
      };

    if (isUseFiat) {
      const originalAmount = new BigNumber(tokenPrice).isGreaterThan(0)
        ? amountBN
            .dividedBy(tokenPrice)
            .decimalPlaces(tokenDecimals, BigNumber.ROUND_CEIL)
            .toFixed()
        : '0';
      return {
        amount: getFormattedNumber(originalAmount, { decimal: 4 }) ?? '0',
        originalAmount,
      };
    }

    const originalAmount = amountBN.times(tokenPrice).toFixed();
    return {
      originalAmount,
      amount: getFormattedNumber(originalAmount, { decimal: 4 }) ?? '0',
    };
  }, [amount, isUseFiat, tokenDetails?.info.decimals, tokenDetails?.price]);

  const {
    result: { displayAmountFormItem } = { displayAmountFormItem: false },
  } = usePromiseResult(async () => {
    const vs = await backgroundApiProxy.serviceNetwork.getVaultSettings({
      networkId,
    });
    if (!vs?.hideAmountInputOnFirstEntry) {
      return {
        displayAmountFormItem: true,
      };
    }
    if (toResolved) {
      const toRaw = form.getValues('to').raw;
      const validation =
        await backgroundApiProxy.serviceValidator.validateAmountInputShown({
          networkId,
          toAddress: toRaw ?? '',
        });
      return {
        displayAmountFormItem: validation.isValid,
      };
    }
    return {
      displayAmountFormItem: false,
    };
  }, [toResolved, networkId, form]);

  const handleOnChangeAmountMode = useCallback(() => {
    setIsUseFiat((prev) => !prev);

    form.setValue('amount', linkedAmount.originalAmount);
  }, [form, linkedAmount]);
  const handleOnSelectToken = useCallback(() => {
    if (isSelectTokenDisabled) return;
    navigation.pushModal(EModalRoutes.AssetSelectorModal, {
      screen: EAssetSelectorRoutes.TokenSelector,
      params: {
        networkId,
        accountId,
        tokens: {
          data: allTokens.tokens,
          keys: allTokens.keys,
          map,
        },
        closeAfterSelect: false,
        onSelect: async (data: IToken) => {
          const tokenVaultSettings =
            await backgroundApiProxy.serviceNetwork.getVaultSettings({
              networkId: data.networkId ?? '',
            });

          if (
            tokenVaultSettings.mergeDeriveAssetsEnabled &&
            isAllNetworks &&
            !accountUtils.isOthersAccount({
              accountId: currentAccount.accountId,
            })
          ) {
            const walletId = accountUtils.getWalletIdFromAccountId({
              accountId: data.accountId ?? '',
            });
            navigation.push(EAssetSelectorRoutes.DeriveTypesAddressSelector, {
              networkId: data.networkId ?? '',
              indexedAccountId: account?.indexedAccountId ?? '',
              walletId,
              accountId: data.accountId ?? '',
              actionType: EDeriveAddressActionType.Select,
              token: data,
              tokenMap: map,
              onUnmounted: () => {},
              onSelected: ({ account: a }: { account: INetworkAccount }) => {
                data.accountId = a.id;
                defaultLogger.transaction.send.sendSelect({
                  network: data.networkId ?? networkId,
                  tokenAddress: data.address,
                  tokenSymbol: data.symbol,
                  tokenType: 'Token',
                });
                if (data.accountId && data.networkId) {
                  setCurrentAccount({
                    accountId: data.accountId,
                    networkId: data.networkId,
                  });
                }
                setTokenInfo(data);
                navigation.popStack();
              },
            });
          } else {
            defaultLogger.transaction.send.sendSelect({
              network: data.networkId ?? networkId,
              tokenAddress: data.address,
              tokenSymbol: data.symbol,
              tokenType: 'Token',
            });
            if (data.accountId && data.networkId) {
              setCurrentAccount({
                accountId: data.accountId,
                networkId: data.networkId,
              });
            }
            setTokenInfo(data);
            navigation.popStack();
          }
        },
        isAllNetworks,
      },
    });
  }, [
    account?.indexedAccountId,
    accountId,
    allTokens.keys,
    allTokens.tokens,
    currentAccount.accountId,
    isAllNetworks,
    isSelectTokenDisabled,
    map,
    navigation,
    networkId,
  ]);
  const handleOnConfirm = useCallback(
    async () =>
      errorToastUtils.withErrorAutoToast(async () => {
        try {
          if (!account) return;
          const toAddress = form.getValues('to').resolved;
          if (!toAddress) return;
          let realAmount = amount;

          setIsSubmitting(true);

          if (isNFT) {
            realAmount = nftAmount;
          } else {
            realAmount = amount;

            if (isUseFiat) {
              if (
                new BigNumber(amount).isGreaterThan(
                  tokenDetails?.fiatValue ?? 0,
                )
              ) {
                realAmount = tokenDetails?.balanceParsed ?? '0';
              } else {
                realAmount = linkedAmount.originalAmount;
              }
            }
          }

          const memoValue = form.getValues('memo');
          const paymentIdValue = form.getValues('paymentId');
          const noteValue = form.getValues('note');
          const transfersInfo: ITransferInfo[] = [
            {
              from: account.address,
              to: toAddress,
              amount: realAmount,
              nftInfo:
                isNFT && nftDetails
                  ? {
                      nftId: nftDetails.itemId,
                      nftAddress: nftDetails.collectionAddress,
                      nftType: nftDetails.collectionType,
                    }
                  : undefined,
              tokenInfo: !isNFT && tokenDetails ? tokenDetails.info : undefined,
              memo: memoValue,
              paymentId: paymentIdValue,
              note: noteValue,
            },
          ];

          defaultLogger.transaction.send.addressInput({
            addressInputMethod: addressInputChangeType.current,
          });

          defaultLogger.transaction.send.amountInput({
            tokenType: isNFT ? 'NFT' : 'Token',
            tokenSymbol: isNFT
              ? nft?.metadata?.name
              : tokenDetails?.info.symbol,
            tokenAddress: isNFT
              ? `${nft?.collectionAddress ?? ''}:${nft?.itemId ?? ''}`
              : tokenInfo?.address,
          });

          await sendConfirm.navigationToSendConfirm({
            transfersInfo,
            sameModal: true,
            onSuccess,
            onFail,
            onCancel,
            transferPayload: {
              amountToSend: realAmount,
              isMaxSend,
              isNFT,
              originalRecipient: toAddress,
            },
          });
          setIsSubmitting(false);
        } catch (e: any) {
          setIsSubmitting(false);

          if (
            accountUtils.isWatchingAccount({ accountId: account?.id ?? '' })
          ) {
            throw new OneKeyError({
              message: intl.formatMessage({
                id: ETranslations.wallet_error_trade_with_watched_acocunt,
              }),
              autoToast: true,
            });
          }

          // use the original error to avoid auto-toast twice in UI layer
          throw e;
        }
      }),
    [
      account,
      amount,
      form,
      intl,
      isMaxSend,
      isNFT,
      isUseFiat,
      linkedAmount.originalAmount,
      nft?.collectionAddress,
      nft?.itemId,
      nft?.metadata?.name,
      nftAmount,
      nftDetails,
      onCancel,
      onFail,
      onSuccess,
      sendConfirm,
      tokenDetails,
      tokenInfo?.address,
    ],
  );
  const handleValidateTokenAmount = useCallback(
    async (value: string) => {
      const amountBN = new BigNumber(value ?? 0);

      let isInsufficientBalance = false;
      let isLessThanMinTransferAmount = false;
      const isNative = tokenDetails?.info.isNative;

      const minTransferAmount = isNative
        ? vaultSettings?.nativeMinTransferAmount ??
          vaultSettings?.minTransferAmount ??
          '0'
        : vaultSettings?.minTransferAmount ?? '0';

      if (isUseFiat) {
        if (amountBN.isGreaterThan(tokenDetails?.fiatValue ?? 0)) {
          isInsufficientBalance = true;
        }

        if (
          tokenDetails?.price &&
          !new BigNumber(minTransferAmount).isZero() &&
          amountBN.dividedBy(tokenDetails.price).isLessThan(minTransferAmount)
        ) {
          isLessThanMinTransferAmount = true;
        }
      } else {
        if (amountBN.isGreaterThan(tokenDetails?.balanceParsed ?? 0)) {
          isInsufficientBalance = true;
        }

        if (amountBN.isLessThan(minTransferAmount)) {
          isLessThanMinTransferAmount = true;
        }
      }

      if (isInsufficientBalance)
        return intl.formatMessage(
          {
            id: ETranslations.send_error_insufficient_balance,
          },
          {
            token: tokenSymbol,
          },
        );

      if (isLessThanMinTransferAmount)
        return intl.formatMessage(
          {
            id: ETranslations.send_error_minimum_amount,
          },
          {
            amount: BigNumber.max(tokenMinAmount, minTransferAmount).toFixed(),
            token: tokenSymbol,
          },
        );

      try {
        const toRaw = form.getValues('to').raw;
        await backgroundApiProxy.serviceValidator.validateSendAmount({
          accountId: currentAccount.accountId,
          networkId: currentAccount.networkId,
          amount: amountBN.toString(),
          tokenBalance: tokenDetails?.balanceParsed ?? '0',
          to: toRaw ?? '',
          isNative: tokenDetails?.info.isNative,
        });
      } catch (e) {
        console.log('error: ', e);
        return (e as Error).message;
      }

      if (
        !isNFT &&
        tokenDetails?.info.isNative &&
        amountBN.isZero() &&
        !vaultSettings?.transferZeroNativeTokenEnabled
      ) {
        return intl.formatMessage({
          id: ETranslations.send_cannot_send_amount_zero,
        });
      }

      return true;
    },
    [
      tokenDetails?.info.isNative,
      tokenDetails?.fiatValue,
      tokenDetails?.price,
      tokenDetails?.balanceParsed,
      vaultSettings?.nativeMinTransferAmount,
      vaultSettings?.minTransferAmount,
      vaultSettings?.transferZeroNativeTokenEnabled,
      isUseFiat,
      intl,
      tokenSymbol,
      tokenMinAmount,
      isNFT,
      form,
      currentAccount.accountId,
      currentAccount.networkId,
    ],
  );

  const isSubmitDisabled = useMemo(() => {
    if (isLoadingAssets || isSubmitting || toPending) return true;

    if (!form.formState.isValid) {
      return true;
    }

    if (isNFT && nft?.collectionType === ENFTType.ERC1155 && !nftAmount) {
      return true;
    }

    if (!isNFT && !amount && displayAmountFormItem) {
      return true;
    }
  }, [
    isLoadingAssets,
    isSubmitting,
    toPending,
    form.formState.isValid,
    isNFT,
    nft?.collectionType,
    nftAmount,
    amount,
    displayAmountFormItem,
  ]);

  const maxBalance = useMemo(
    () => tokenDetails?.balanceParsed ?? '0',
    [tokenDetails?.balanceParsed],
  );

  const maxBalanceFiat = useMemo(
    () => tokenDetails?.fiatValue ?? '0',
    [tokenDetails?.fiatValue],
  );

  const renderTokenDataInputForm = useCallback(
    () => (
      <Form.Field
        name="amount"
        label={intl.formatMessage({ id: ETranslations.send_amount })}
        rules={{
          required: true,
          validate: handleValidateTokenAmount,
          onChange: (e: { target: { name: string; value: string } }) => {
            setIsMaxSend(false);
            const value = e.target?.value;
            const valueBN = new BigNumber(value ?? 0);
            if (valueBN.isNaN()) {
              const formattedValue = parseFloat(value);
              form.setValue(
                'amount',
                isNaN(formattedValue) ? '' : String(formattedValue),
              );
              return;
            }
            const dp = valueBN.decimalPlaces();
            if (!isUseFiat && dp && dp > (tokenDetails?.info.decimals ?? 0)) {
              form.setValue(
                'amount',
                valueBN.toFixed(tokenDetails?.info.decimals ?? 0),
              );
            }
          },
        }}
      >
        <AmountInput
          reversible
          enableMaxAmount
          balanceProps={{
            loading: isLoadingAssets,
            value: maxBalance,
            onPress: () => {
              form.setValue('amount', isUseFiat ? maxBalanceFiat : maxBalance);
              void form.trigger('amount');
              setIsMaxSend(true);
            },
          }}
          valueProps={{
            currency: isUseFiat ? undefined : currencySymbol,
            tokenSymbol: isUseFiat ? tokenSymbol : undefined,
            value: linkedAmount.originalAmount,
            onPress: handleOnChangeAmountMode,
          }}
          inputProps={{
            placeholder: '0',
            ...(isUseFiat && {
              leftAddOnProps: {
                label: currencySymbol,
                pr: '$0',
                pl: '$3.5',
                mr: '$-2',
              },
            }),
          }}
          tokenSelectorTriggerProps={{
            selectedTokenImageUri: isNFT
              ? nft?.metadata?.image
              : tokenInfo?.logoURI,
            selectedNetworkImageUri: network?.logoURI,
            selectedNetworkName: network?.name,
            selectedTokenSymbol: isNFT
              ? nft?.metadata?.name
              : tokenInfo?.symbol,
            isCustomNetwork: network?.isCustomNetwork,
            onPress: isNFT ? undefined : handleOnSelectToken,
            disabled: isSelectTokenDisabled,
          }}
          {...(hasFrozenBalance && {
            balanceHelperProps: {
              onPress: () => {
                showBalanceDetailsDialog({
                  accountId: currentAccount.accountId,
                  networkId: currentAccount.networkId,
                });
              },
            },
          })}
        />
      </Form.Field>
    ),
    [
      currencySymbol,
      currentAccount.accountId,
      currentAccount.networkId,
      form,
      handleOnChangeAmountMode,
      handleOnSelectToken,
      handleValidateTokenAmount,
      hasFrozenBalance,
      intl,
      isLoadingAssets,
      isNFT,
      isSelectTokenDisabled,
      isUseFiat,
      linkedAmount.originalAmount,
      maxBalance,
      maxBalanceFiat,
      network?.isCustomNetwork,
      network?.logoURI,
      network?.name,
      nft?.metadata?.image,
      nft?.metadata?.name,
      tokenDetails?.info.decimals,
      tokenInfo?.logoURI,
      tokenInfo?.symbol,
      tokenSymbol,
    ],
  );
  const renderNFTDataInputForm = useCallback(() => {
    if (nft?.collectionType === ENFTType.ERC1155) {
      return (
        <Form.Field
          name="nftAmount"
          label={intl.formatMessage({ id: ETranslations.send_amount })}
          rules={{ required: true, max: nftDetails?.amount ?? 1, min: 1 }}
        >
          {isLoadingAssets ? null : (
            <SizableText
              size="$bodyMd"
              color="$textSubdued"
              position="absolute"
              right="$0"
              top="$0"
            >
              {intl.formatMessage({ id: ETranslations.global_available })}:{' '}
              {nftDetails?.amount ?? 1}
            </SizableText>
          )}
          <Input
            size="large"
            $gtMd={{
              size: 'medium',
            }}
            addOns={[
              {
                loading: isLoadingAssets,
                label: intl.formatMessage({ id: ETranslations.send_max }),
                onPress: () => {
                  form.setValue('nftAmount', nftDetails?.amount ?? '1');
                  void form.trigger('nftAmount');
                },
              },
            ]}
          />
        </Form.Field>
      );
    }
    return null;
  }, [form, intl, isLoadingAssets, nft?.collectionType, nftDetails?.amount]);

  const renderMemoForm = useCallback(() => {
    if (!displayMemoForm) return null;
    const maxLength = memoMaxLength || 256;
    const validateErrMsg = numericOnlyMemo
      ? intl.formatMessage({
          id: ETranslations.send_field_only_integer,
        })
      : undefined;
    const memoRegExp = numericOnlyMemo ? /^[0-9]+$/ : undefined;

    return (
      <>
        <Form.Field
          label={intl.formatMessage({ id: ETranslations.send_tag })}
          optional
          name="memo"
          rules={{
            maxLength: {
              value: maxLength,
              message: intl.formatMessage(
                {
                  id: ETranslations.dapp_connect_msg_description_can_be_up_to_int_characters,
                },
                {
                  number: maxLength,
                },
              ),
            },
            validate: (value) => {
              if (!value || !memoRegExp) return undefined;
              const result = !memoRegExp.test(value);
              return result ? validateErrMsg : undefined;
            },
          }}
        >
          <TextArea
            numberOfLines={2}
            size={media.gtMd ? 'medium' : 'large'}
            placeholder={intl.formatMessage({
              id: ETranslations.send_tag_placeholder,
            })}
          />
        </Form.Field>
      </>
    );
  }, [displayMemoForm, intl, media.gtMd, memoMaxLength, numericOnlyMemo]);

  const renderPaymentIdForm = useCallback(() => {
    if (!displayPaymentIdForm) return null;
    return (
      <>
        <XStack pt="$5" />
        <Form.Field
          label="Payment ID"
          optional
          name="paymentId"
          rules={{
            validate: (value) => {
              if (!value) return undefined;
              if (
                !hexUtils.isHexString(hexUtils.addHexPrefix(value)) ||
                hexUtils.stripHexPrefix(value).length !== 64
              ) {
                return intl.formatMessage({
                  id: ETranslations.form_payment_id_error_text,
                });
              }
            },
          }}
        >
          <TextArea
            numberOfLines={2}
            size={media.gtMd ? 'medium' : 'large'}
            placeholder="Payment ID"
          />
        </Form.Field>
      </>
    );
  }, [displayPaymentIdForm, intl, media.gtMd]);

  const renderNoteForm = useCallback(() => {
    if (!displayNoteForm) return null;
    const maxLength = noteMaxLength ?? 512;
    return (
      <Form.Field
        label={intl.formatMessage({
          id: ETranslations.global_Note,
        })}
        optional
        name="note"
        rules={{
          maxLength: {
            value: maxLength,
            message: intl.formatMessage(
              {
                id: ETranslations.send_memo_up_to_length,
              },
              {
                number: maxLength,
              },
            ),
          },
        }}
      >
        <TextArea
          numberOfLines={2}
          size={media.gtMd ? 'medium' : 'large'}
          placeholder={intl.formatMessage({
            id: ETranslations.global_Note,
          })}
        />
      </Form.Field>
    );
  }, [displayNoteForm, intl, media.gtMd, noteMaxLength]);

  const renderDataInput = useCallback(() => {
    if (isNFT) {
      return renderNFTDataInputForm();
    }
    if (displayAmountFormItem) {
      return (
        <>
          {renderTokenDataInputForm()}
          {renderMemoForm()}
          {renderPaymentIdForm()}
          {renderNoteForm()}
        </>
      );
    }
    return null;
  }, [
    isNFT,
    displayAmountFormItem,
    renderNFTDataInputForm,
    renderTokenDataInputForm,
    renderMemoForm,
    renderPaymentIdForm,
    renderNoteForm,
  ]);

  useEffect(() => {
    if (token || nft) {
      defaultLogger.transaction.send.sendSelect({
        network: currentAccount.networkId,
        tokenAddress:
          token?.address ??
          `${nft?.collectionAddress ?? ''}:${nft?.itemId ?? ''}`,
        tokenSymbol: token?.symbol,
        tokenType: isNFT ? 'NFT' : 'Token',
      });
    }
  }, [networkId, token, nft, isNFT, currentAccount.networkId]);

  useEffect(() => {
    if (
      !isNil(tokenDetails?.balance) &&
      form.getFieldState('amount').isTouched
    ) {
      void form.trigger('amount');
    }
  }, [form, tokenDetails?.balance]);

  const addressInputAccountSelectorArgs = useMemo<{ num: number } | undefined>(
    () =>
      addressBookEnabledNetworkIds.includes(currentAccount.networkId)
        ? { num: 0, clearNotMatch: true }
        : undefined,
    [addressBookEnabledNetworkIds, currentAccount.networkId],
  );

  const handleAddressInputChangeType = useCallback(
    (type: EInputAddressChangeType) => {
      addressInputChangeType.current = type;
    },
    [],
  );

  return (
    <Page scrollEnabled safeAreaEnabled>
      <Page.Header
        title={intl.formatMessage({ id: ETranslations.send_title })}
      />
      <Page.Body px="$5" testID="send-recipient-amount-form">
        <AccountSelectorProviderMirror
          config={{
            sceneName: EAccountSelectorSceneName.addressInput, // can replace with other sceneName
            sceneUrl: '',
          }}
          enabledNum={[0]}
          availableNetworksMap={{
            0: {
              networkIds: [currentAccount.networkId],
              defaultNetworkId: currentAccount.networkId,
            },
          }}
        >
          <Form form={form}>
            {isNFT ? (
              <Form.Field
                label={intl.formatMessage({ id: ETranslations.global_nft })}
                name="nft"
              >
                <ListItem
                  mx="$0"
                  borderWidth={1}
                  borderColor="$border"
                  borderRadius="$2"
                >
                  <XStack alignItems="center" gap="$1" flex={1}>
                    <Token
                      isNFT
                      size="lg"
                      tokenImageUri={nft?.metadata?.image}
                      networkImageUri={network?.logoURI}
                      networkId={network?.id}
                      showNetworkIcon
                    />
                    <ListItem.Text
                      flex={1}
                      primary={nft?.metadata?.name}
                      secondary={
                        <SizableText
                          size="$bodyMd"
                          color="$textSubdued"
                          style={{ wordBreak: 'break-all' }}
                        >
                          {!isNil(nft?.itemId)
                            ? `${intl.formatMessage({
                                id: ETranslations.nft_token_id,
                              })}: ${accountUtils.shortenAddress({
                                address: nft.itemId,
                                leadingLength: 6,
                              })}`
                            : ''}
                        </SizableText>
                      }
                    />
                  </XStack>
                </ListItem>
              </Form.Field>
            ) : null}
            <Form.Field
              label={intl.formatMessage({ id: ETranslations.global_recipient })}
              name="to"
              rules={{
                required: true,
                validate: (value: IAddressInputValue) => {
                  if (value.pending) {
                    return;
                  }
                  if (!value.resolved) {
                    return (
                      value.validateError?.message ??
                      intl.formatMessage({
                        id: ETranslations.send_address_invalid,
                      })
                    );
                  }
                },
              }}
            >
              <AddressInput
                accountId={currentAccount.accountId}
                networkId={currentAccount.networkId}
                enableAddressBook
                enableWalletName
                enableVerifySendFundToSelf
                enableAddressInteractionStatus
                enableAddressContract
                contacts={addressBookEnabledNetworkIds.includes(
                  currentAccount.networkId,
                )}
                accountSelector={addressInputAccountSelectorArgs}
                onInputTypeChange={handleAddressInputChangeType}
              />
            </Form.Field>
            {renderDataInput()}
          </Form>
        </AccountSelectorProviderMirror>
      </Page.Body>
      <Page.Footer
        onConfirm={handleOnConfirm}
        onConfirmText={intl.formatMessage({
          id: ETranslations.send_preview_button,
        })}
        confirmButtonProps={{
          disabled: isSubmitDisabled,
          loading: isSubmitting,
        }}
      />
    </Page>
  );
}

const SendDataInputContainerWithProvider = memo(() => (
  <HomeTokenListProviderMirror>
    <SendDataInputContainer />
  </HomeTokenListProviderMirror>
));
SendDataInputContainerWithProvider.displayName =
  'SendDataInputContainerWithProvider';

export { SendDataInputContainer, SendDataInputContainerWithProvider };
