/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {Dimensions} from 'react-native';
import {TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../config';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
function ListProduct({product, handleGetDetail}) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <TouchableHighlight
      underlayColor="#fff"
      activeOpacity={0.9}
      onPress={handleGetDetail}>
      <View style={style.card}>
        <View style={{alignItems: 'center', top: -40}}>
          <Image
            source={{
              uri: `http://172.20.10.3:5000/uploads/${product.image}`,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: 120, width: 120}}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {product.nameproduct}
          </Text>
          <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
            {product.status}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${product.price}
          </Text>
          <View style={style.addToCartBtn}>
            <Icon name="add" size={20} color={COLORS.white} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 250,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ListProduct;
