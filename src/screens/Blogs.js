/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListBlog from '../components/ListBlog';
import {COLORS} from '../config';
import {getListBlog} from '../redux/api/apiSlice';

function Blogs() {
  const {isLoading, news} = useSelector((state) => state.app);
  console.log(news)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListBlog());
  }, [dispatch]);
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={news}
            numColumns={1}
            keyExtractor={({_id}, index) => _id}
            renderItem={({item}) => <ListBlog blog={item} key={item._id} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default Blogs;
