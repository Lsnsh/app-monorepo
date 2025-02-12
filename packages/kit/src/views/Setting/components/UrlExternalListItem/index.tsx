import type { ComponentProps, FC } from 'react';
import { useCallback } from 'react';

import { ListItem } from '@onekeyhq/kit/src/components/ListItem';
import { openUrlExternal } from '@onekeyhq/shared/src/utils/openUrlUtils';

type IUrlExternalListItemProps = {
  icon: ComponentProps<typeof ListItem>['icon'];
  title: string;
  url: string;
  drillIn?: boolean;
};

export const UrlExternalListItem: FC<IUrlExternalListItemProps> = ({
  icon,
  title,
  url,
  drillIn,
}) => {
  const onPress = useCallback(() => {
    openUrlExternal(url);
  }, [url]);
  return (
    <ListItem onPress={onPress} icon={icon} title={title} drillIn={drillIn}>
      {!drillIn ? (
        <ListItem.IconButton
          disabled
          icon="ArrowTopRightOutline"
          iconProps={{
            color: '$iconActive',
          }}
        />
      ) : null}
    </ListItem>
  );
};
