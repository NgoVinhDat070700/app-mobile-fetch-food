/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {Image} from 'react-native';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../config';
import {getListCategory} from '../redux/api/apiSlice';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const ListCategory = ({setSelectCategory}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const {categories} = useSelector((state) => state.app);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  const chooseCategory = (category, index) => {
    setSelectedCategoryIndex(index + 1);
    setSelectCategory(category);
  };
  const viewAllProduct = () => {
    setSelectCategory({});
    setSelectedCategoryIndex(0);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categoriesListContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={viewAllProduct}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor:
              selectedCategoryIndex === 0 ? '#F9813A' : COLORS.secondary,
            ...style.categoryBtn,
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            All Products
          </Text>
        </View>
      </TouchableOpacity>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={category._id}
          activeOpacity={0.8}
          onPress={() => chooseCategory(category, index)}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor:
                selectedCategoryIndex === index + 1
                  ? '#F9813A'
                  : COLORS.secondary,
              ...style.categoryBtn,
            }}>
            <View style={style.categoryBtnImgCon}>
              <Image
                source={{
                  uri: `http://192.168.1.219:5000/uploads/${category.image}`,
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
            </View>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                color: selectedCategoryIndex === index + 1 ? '#fff' : '#F9813A',
              }}>
              {category.namecategory}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
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
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#F9813A',
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
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'space-between',
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
    backgroundColor: '#fff',
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#F9813A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListCategory;
