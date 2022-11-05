import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ListRenderItem,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  AddToFavoritesAction,
  GetItemByIDAction,
  GetItemsAction,
  RemoveFromFavoritesAction,
  ResetOffsetAction,
  SearchItemsAction,
} from '../../../Store/Actions/Home';
import {GIPHY} from '../../../Types';
import {NavigationProp} from '@react-navigation/native';
import {HomeStackParamsList} from '../../../Navigation/HomeStack';
import ItemCard from '../../../Components/ItemCard';
import Spacer from '../../../Components/Spacer';
import {useTypedDispatch} from '../../../Store';

interface ItemsListProps {
  navigation: NavigationProp<HomeStackParamsList>;
}

const ItemsList = ({navigation}: ItemsListProps) => {
  const [query, setQuery] = useState('');
  const [searchItems, setSearchItems] = useState([]);

  const dispatch = useTypedDispatch();
  const {navigate} = navigation;
  const flatListRef = useRef<FlatList>(null);

  const {items} = useSelector((state: any) => state.HomeReducer);
  const {favorites} = useSelector((state: any) => state.HomeReducer);
  const {isLoading} = useSelector((state: any) => state.HomeReducer);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        badge: {
          position: 'absolute',
          right: 0,
          bottom: 25,
          width: 30,
          height: 30,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        },
        card: {
          flexDirection: 'row',
          marginVertical: 5,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 5,
          width: '100%',
          justifyContent: 'space-between',
        },
        cardImage: {
          width: 50,
          height: 50,
          borderRadius: 5,
        },
        favoriteIcon: {
          borderWidth: 1,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
        },
        input: {
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          borderColor: 'gray',
          width: '75%',
        },
        title: {
          paddingLeft: 5,
          width: 190,
          fontWeight: 'bold',
        },
      }),
    [],
  );
  useEffect(() => {
    if (!query) {
      dispatch(GetItemsAction());
    }
  }, [dispatch]);

  const navigateToItemDetails = (itemId: string) => {
    dispatch(GetItemByIDAction(itemId, navigate));
  };

  const navigateToFavorites = () => {
    navigate('Favorites');
  };

  const handleAddToFavorites = (item: GIPHY) => {
    dispatch(AddToFavoritesAction(item));
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    dispatch(RemoveFromFavoritesAction(itemId));
  };

  // const handleLoadMore = () => {
  //   dispatch(IncreaseOffsetAction());
  //   if (query) {
  //     dispatch(SearchItemsAction(query, setSearchItems));
  //   } else {
  //     dispatch(GetItemsAction());
  //   }
  // };

  const handleSearch = (value: string) => {
    setQuery(value);

    if (!value) {
      console.log('entered if');
      dispatch(GetItemsAction());
      setSearchItems([]);
      dispatch(ResetOffsetAction());
    } else {
      dispatch(SearchItemsAction(value, setSearchItems));
    }
  };

  const renderItem: ListRenderItem<GIPHY> | undefined | null = ({item}) => {
    return (
      <ItemCard
        item={item}
        onPress={() => navigateToItemDetails(item?.id)}
        onPressAddToFavorites={() => handleAddToFavorites(item)}
        onPressRemoveFromFavorites={() => handleRemoveFromFavorites(item?.id)}
        addToFavorites
      />
    );
  };

  const renderFooter = () => isLoading && <ActivityIndicator size={'large'} />;

  return (
    <View style={{flex: 1, padding: 10}}>
      <SafeAreaView />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={value => handleSearch(value)}
          placeholder={'Search here...'}
        />
        <Spacer horizontal size={2} />
        {favorites?.length > 0 && (
          <View style={styles.badge}>
            <Text style={{color: 'white'}}>{favorites?.length}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={navigateToFavorites}
          style={styles.favoriteIcon}>
          <Text>Favorites</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        scrollsToTop
        disableVirtualization={true}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        data={query ? searchItems : items}
        renderItem={renderItem}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        windowSize={10}
        keyExtractor={(item: GIPHY) => item?.id}
        updateCellsBatchingPeriod={20}
      />
    </View>
  );
};

export default ItemsList;
