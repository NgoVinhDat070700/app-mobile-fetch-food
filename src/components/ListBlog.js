import {TouchableHighlight} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';

import {COLORS} from '../config';
import {fDate} from '../utils/formatTime';
function ListBlog({blog}) {
  return (
    <TouchableHighlight underlayColor="#fff" activeOpacity={0.9} >
      <View style={style.content}>
        <View>
          <Image
            source={{
              uri: `http://192.168.1.219:5000/uploads/${blog.image}`,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: 200, width: '100%'}}
          />
        </View>
        <View>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>{blog.title}</Text>
          <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 2}}>
            {fDate(blog.createdAt)}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={style.action}>
            <Button color="#ffcc66" title="Xem chi tiết" />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
const style = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ListBlog;
