import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  ClearFavoritesAction,
  GetItemByIDAction,
  GetItemsAction,
  RemoveFromFavoritesAction,
} from '../../../Store/Actions/Home';
import {GIPHY} from '../../../Types';
import {NavigationProp} from '@react-navigation/native';
import {HomeStackParamsList} from '../../../Navigation/HomeStack';
import ItemCard from '../../../Components/ItemCard';
import {useTypedDispatch} from '../../../Store';

interface FavoritesProps {
  navigation: NavigationProp<HomeStackParamsList>;
}

const Favorites = ({navigation}: FavoritesProps) => {
  const dispatch = useTypedDispatch();
  const {navigate} = navigation;
  const favorites = useSelector((state: any) => state.HomeReducer.favorites);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        clearButton: {
          borderWidth: 1,
          padding: 10,
          alignItems: 'center',
          borderRadius: 5,
        },
        noFavorites: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }),
    [],
  );
  useEffect(() => {
    dispatch(GetItemsAction());
  }, [dispatch]);

  const navigateToItemDetails = (itemId: string) => {
    dispatch(GetItemByIDAction(itemId, navigate));
  };

  const handleClearFavorites = () => {
    dispatch(ClearFavoritesAction());
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    dispatch(RemoveFromFavoritesAction(itemId));
  };

  const renderItem: ListRenderItem<GIPHY> | undefined | null = ({item}) => {
    return (
      <ItemCard
        item={item}
        onPress={() => navigateToItemDetails(item?.id)}
        onPressRemoveFromFavorites={() => handleRemoveFromFavorites(item?.id)}
      />
    );
  };

  const renderClearButton = () => {
    return favorites.length > 0 ? (
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearFavorites}>
        <Text>{'Clear All'}</Text>
      </TouchableOpacity>
    ) : (
      <Fragment />
    );
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        ListHeaderComponent={renderClearButton}
        contentContainerStyle={{
          alignItems: favorites?.length > 0 ? 'stretch' : 'center',
          justifyContent: favorites?.length > 0 ? 'flex-start' : 'center',
          flex: favorites?.length > 0 ? 0 : 1,
        }}
        data={favorites}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.noFavorites}>No favorites</Text>
        )}
      />
    </View>
  );
};

export default Favorites;
