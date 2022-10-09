/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../config';
import {addCart} from '../redux/api/apiSlice';

function ProductDetail({navigation}) {
  const [quatity, setQuatity] = useState(1);
  const {productDetail} = useSelector((state) => state.app);
  const handleDecrement = () =>
    setQuatity((state) => (state > 1 ? state - 1 : state));

  const dispatch = useDispatch();

  const goBack = () => navigation.goBack();
  const handleAddCart = (product) => {
    dispatch(
      addCart({
        id: product._id,
        quatity,
        nameproduct: product.nameproduct,
        price: product.price,
        image: product.image,
      }),
    );
    navigation.navigate('Cart');
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}} onPress={goBack}>
          Details
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image
            source={{
              uri: `http://192.168.1.219:5000/uploads/${productDetail.image}`,
            }}
            style={{height: 220, width: 220}}
          />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
              {productDetail.nameproduct}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
            {productDetail.price} VND
          </Text>
          <Text style={style.detailsText}>{productDetail.desc}</Text>
          <View style={{marginTop: 40, marginBottom: 40}}>
            <TouchableOpacity
              style={style.btn_add_cart}
              onPress={() => handleAddCart(productDetail)}>
              <Text style={style.text_btn}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  btn_add_cart: {
    backgroundColor: '#242424',
    paddingVertical: 15,
    borderRadius: 8,
    flex: 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_btn: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ProductDetail;
