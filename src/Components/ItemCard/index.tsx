import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {GIPHY} from '../../Types';
import Spacer from '../Spacer';
import {useSelector} from 'react-redux';

interface ItemCardProps {
  onPress: () => void;
  onPressAddToFavorites?: () => void;
  onPressRemoveFromFavorites: () => void;
  item: GIPHY;
  addToFavorites?: boolean;
  disabled?: boolean;
}

const ItemCard = ({
  onPress,
  onPressAddToFavorites,
  onPressRemoveFromFavorites,
  item,
  addToFavorites,
  disabled,
}: ItemCardProps) => {
  const {favorites} = useSelector((state: any) => state.HomeReducer);
  const itemInFavorite = favorites?.find(
    (favoriteItem: GIPHY) => favoriteItem.id === item.id,
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          flexDirection: 'row',
          marginVertical: 5,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 5,
        },
        cardImage: {
          width: 50,
          height: 50,
          borderRadius: 5,
        },
        column: {
          paddingLeft: 10,
          alignItems: 'flex-start',
        },
        title: {
          fontWeight: 'bold',
        },
      }),
    [],
  );

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{uri: item?.images?.original?.url}}
      />
      <View style={styles.column}>
        <Text style={styles.title}>{item?.title}</Text>
        <Spacer size={5} />
        {addToFavorites && !itemInFavorite ? (
          <TouchableOpacity onPress={onPressAddToFavorites}>
            <Text>{'Add to favorites'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressRemoveFromFavorites}>
            <Text>{'Remove from favorites'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
