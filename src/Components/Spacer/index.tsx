import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

export type SpacerProps = {
  size?: number;
  horizontal?: boolean;
  backgroundColor?: string;
};

const Spacer = (props: SpacerProps) => {
  const {size, horizontal, backgroundColor} = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? 'width' : 'height']: size ?? 10,
          backgroundColor,
        },
      }),
    [backgroundColor, horizontal, size],
  );

  return <View style={styles.spacerStyle} />;
};

export default Spacer;
