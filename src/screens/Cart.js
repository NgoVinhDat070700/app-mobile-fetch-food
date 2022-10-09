/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {PrimaryButton} from '../components/Button';
import {COLORS} from '../config';
import {
  decrementCartByID,
  increaseCartByID,
  removeCartByID,
} from '../redux/api/apiSlice';

const Cart = ({navigation}) => {
  const {cart, money} = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleIncreaseItem = (id) => dispatch(increaseCartByID(id));
  const handleDecrementItem = (id) => dispatch(decrementCartByID(id));
  const handleDeleteAllItem = (id) => dispatch(removeCartByID(id));

  const handleCheckout = () => {
    if (Object.keys(cart).length === 0) {
      alert('Ban chua mua hang nen khong the thanh toan!');
    } else {
      navigation.navigate('Payment');
    }
  };
  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image
          source={{
            uri: `http://192.168.1.219:5000/uploads/${item.image}`,
          }}
          style={{height: 80, width: 80}}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {item.nameproduct}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
          <Icon
            name="delete"
            size={25}
            onPress={() => handleDeleteAllItem(item.id)}
          />
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quatity}</Text>
          <View style={style.actionBtn}>
            <Icon
              name="remove"
              size={25}
              color={COLORS.white}
              onPress={() => handleDecrementItem(item.id)}
            />
            <Icon
              name="add"
              size={25}
              color={COLORS.white}
              onPress={() => handleIncreaseItem(item.id)}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={cart}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{money}</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <PrimaryButton title="CHECKOUT" onPress={handleCheckout} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default Cart;
