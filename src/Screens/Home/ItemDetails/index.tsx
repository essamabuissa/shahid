import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  AddToFavoritesAction,
  ClearActiveItemAction,
  RemoveFromFavoritesAction,
} from '../../../Store/Actions/Home';
import {GIPHY} from '../../../Types';
import Spacer from '../../../Components/Spacer';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../../Navigation/HomeStack';
import {useTypedDispatch} from '../../../Store';

interface ItemDetailstProps {
  navigation: StackNavigationProp<HomeStackParamsList>;
}

const ItemDetails = ({navigation}: ItemDetailstProps) => {
  const {favorites} = useSelector((state: any) => state.HomeReducer);
  const itemInFavorite = favorites?.find(
    (favoriteItem: GIPHY) => favoriteItem.id === item?.id,
  );
  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          backgroundColor: 'white',
          width: '50%',
          alignSelf: 'center',
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
          borderRadius: 5,
        },
        buttonTitle: {
          fontWeight: 'bold',
        },
        container: {flex: 1},
        image: {width: '100%', height: 300, borderWidth: 0},
        innerContainer: {paddingHorizontal: 10},
        title: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        url: {
          textDecorationLine: 'underline',
        },
      }),
    [],
  );
  const dispatch = useTypedDispatch();
  const item = useSelector((state: any) => state.HomeReducer.activeItem);

  useEffect(() => {
    return () => {
      dispatch(ClearActiveItemAction());
    };
  }, [dispatch]);

  const handleVisitUrl = () => {
    Linking.openURL(item?.url);
  };

  const handleAddToFavorites = (ITEM: GIPHY) => {
    dispatch(AddToFavoritesAction(ITEM));
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    dispatch(RemoveFromFavoritesAction(itemId));
  };

  console.log(itemInFavorite, 'itemInFavorite');

  return (
    <View style={styles.container}>
      {item ? (
        <Fragment>
          {item?.images?.original?.url ? (
            <Image
              source={{uri: item?.images?.original?.url}}
              style={styles.image}
            />
          ) : (
            <ActivityIndicator />
          )}
          <Spacer />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.title}>{'Type:' + item?.type}</Text>
            <Text style={styles.title}>{'Slug:' + item?.slug}</Text>
            <TouchableOpacity onPress={handleVisitUrl}>
              <Text style={styles.url}>{item?.url}</Text>
            </TouchableOpacity>
            {!favorites?.find(
              (favoriteItem: GIPHY) => favoriteItem.id === item?.id,
            ) ? (
              <TouchableOpacity
                onPress={() => handleAddToFavorites(item)}
                style={styles.button}>
                <Text style={styles.buttonTitle}>{'Add To Favorites'}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleRemoveFromFavorites(item.id)}
                style={styles.button}>
                <Text style={styles.buttonTitle}>{'Remove To Favorites'}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
              <Text style={styles.buttonTitle}>{'Close'}</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default ItemDetails;
