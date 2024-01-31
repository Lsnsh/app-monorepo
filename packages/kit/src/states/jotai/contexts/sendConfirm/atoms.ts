import type { IUnsignedTxPro } from '@onekeyhq/core/src/types';
import type { IFeeInfoUnit } from '@onekeyhq/shared/types/fee';
import { EFeeType, ESendFeeStatus } from '@onekeyhq/shared/types/fee';

import { createJotaiContext } from '../../utils/createJotaiContext';

const {
  Provider: ProviderJotaiContextSendConfirm,
  withProvider: withSendConfirmProvider,
  contextAtom,
  contextAtomMethod,
} = createJotaiContext();
export {
  ProviderJotaiContextSendConfirm,
  withSendConfirmProvider,
  contextAtomMethod,
};

export const { atom: unsignedTxsAtom, use: useUnsignedTxsAtom } = contextAtom<
  IUnsignedTxPro[]
>([]);

export const { atom: sendSelectedFeeAtom, use: useSendSelectedFeeAtom } =
  contextAtom<{
    feeType: EFeeType;
    presetIndex: number;
  }>({
    feeType: EFeeType.Standard,
    presetIndex: 1,
  });

export const { atom: customFeeAtom, use: useCustomFeeAtom } = contextAtom<
  IFeeInfoUnit | undefined
>(undefined);

export const {
  atom: sendSelectedFeeInfoAtom,
  use: useSendSelectedFeeInfoAtom,
} = contextAtom<
  | {
      totalNative: string;
      feeInfo: IFeeInfoUnit;
    }
  | undefined
>(undefined);

export const { atom: sendFeeStatusAtom, use: useSendFeeStatusAtom } =
  contextAtom<{
    status: ESendFeeStatus;
    errMessage?: string;
  }>({
    status: ESendFeeStatus.Idle,
    errMessage: '',
  });

export const {
  atom: nativeTokenTransferAmountAtom,
  use: useNativeTokenTransferAmountAtom,
} = contextAtom<string | undefined>('0');

export const { atom: sendTxStatusAtom, use: useSendTxStatusAtom } =
  contextAtom<{
    isLoadingNativeBalance?: boolean;
    isInsufficientNativeBalance?: boolean;
  }>({
    isLoadingNativeBalance: false,
    isInsufficientNativeBalance: false,
  });