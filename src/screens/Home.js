/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import {Text} from 'react-native';
import {TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ListCategory from '../components/ListCategory';
import {COLORS} from '../config';
import {getListProductBySearch} from '../redux/api/apiSlice';
import Products from './Products';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
export default function Home({navigation}) {
  const [selectCategory, setSelectCategory] = useState({});
  const [inputSearch, setInputSearch] = useState('');

  const {user} = useSelector((state) => state.app.auth);

  const {username = ''} = user || {};
  const dispatch = useDispatch();
  const searchProduct = async () => {
    dispatch(getListProductBySearch(inputSearch));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              {username}
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
            What do you want today
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for food"
            value={inputSearch}
            onChangeText={(value) => setInputSearch(value)}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon
            name="tune"
            size={28}
            color={COLORS.white}
            onPress={searchProduct}
          />
        </View>
      </View>
      <View>
        <ListCategory setSelectCategory={setSelectCategory} />
      </View>
      <Products selectCategory={selectCategory} navigation={navigation} />
    </SafeAreaView>
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
    height: 220,
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
