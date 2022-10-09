import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListProduct from '../components/ListProduct';
import {getListProduct, getProductDetail} from '../redux/api/apiSlice';

// eslint-disable-next-line no-undef
export default Products = ({navigation, selectCategory}) => {
  const {_id: idCategory = ''} = selectCategory || {};

  const {products, isLoading} = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProduct(idCategory));
  }, [idCategory, selectCategory, dispatch]);

  const handleGetDetail = (product) => {
    dispatch(getProductDetail(product));
    navigation.navigate('ProductDetail');
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, padding: 5}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          numColumns={2}
          keyExtractor={({_id}, index) => _id}
          renderItem={({item}) => (
            <ListProduct
              product={item}
              key={item._id}
              handleGetDetail={() => handleGetDetail(item)}
            />
          )}
        />
      )}
    </View>
  );
};
