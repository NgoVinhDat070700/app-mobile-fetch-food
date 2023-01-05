/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../config';
import {paymentOrder, resetCart} from '../redux/api/apiSlice';

function Payment({navigation}) {
  const initialValues = {
    fullname: '',
    email: '',
    address: '',
    phone: '',
  };
  const {user} = useSelector((state) => state.app.auth);

  const cart = useSelector((state) => state.app.cart);
  const dispatch = useDispatch();
  console.log(cart);
  let qty = 0;
  cart.forEach((item) => {
    // eslint-disable-next-line no-const-assign
    qty += item.quatity;
  });

  const {_id = ''} = user || {};
  const handleSubmitPayment = async (values) => {
    const dataForm = {
      userId: _id,
      products: cart,
      amount: qty,
      ...values,
    };

    const result = await dispatch(paymentOrder(dataForm));
    console.log(result);
    if (paymentOrder.fulfilled.match(result)) {
      alert('Đặt hàng thành công!');
      dispatch(resetCart());
      navigation.navigate('Cart');
    } else {
      alert('Đặt hàng thất bại!');
    }
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Payment</Text>
      </View>

      <Text style={style.title}>Payment</Text>
      <View style={style.form}>
        <View>
          <Formik initialValues={initialValues} onSubmit={handleSubmitPayment}>
            {({handleSubmit, handleChange}) => (
              <>
                <View style={style.formInput}>
                  <TextInput
                    placeholder="Fullname..."
                    returnKeyType="go"
                    keyboardType="default"
                    style={style.textInput}
                    onChangeText={handleChange('fullname')}
                    testID="fullname"
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View style={style.formInput}>
                  <TextInput
                    placeholder="Email..."
                    returnKeyType="go"
                    keyboardType="default"
                    onChangeText={handleChange('email')}
                    style={style.textInput}
                    testID="email"
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View style={style.formInput}>
                  <TextInput
                    placeholder="Address..."
                    returnKeyType="go"
                    keyboardType="default"
                    onChangeText={handleChange('address')}
                    testID="address"
                    style={style.textInput}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View style={style.formInput}>
                  <TextInput
                    placeholder="Phone..."
                    returnKeyType="go"
                    keyboardType="default"
                    onChangeText={handleChange('phone')}
                    testID="phone"
                    style={style.textInput}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <TouchableOpacity
                  style={style.btnPayment}
                  testID="btnSubmit"
                  onPress={handleSubmit}>
                  <Text style={style.titleBtn}>Payment</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <Text
            style={{
              marginTop: 5,
              color: '#000',
              fontSize: 20,
              // alignSelf: 'stretch',
              alignItems: 'center',
              marginLeft: 30,
            }}>
            ------------------------ Hoặc --------------------------
          </Text>
          <TouchableOpacity style={style.btnLoginPaypal}>
            <ImageBackground
              source={require('../assets/paypal-logo.png')}
              resizeMode="cover"
              style={{
                alignSelf: 'stretch',
                height: 50,
                opacity: 0.6,
              }}>
              <Text
                style={{
                  color: 'fff',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: 45,
                }}>
                Thanh toán với Paypal
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  formInput: {
    display: 'flex',
    height: 60,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 60,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  btnPayment: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ff7373',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  titleBtn: {
    fontSize: 20,
    color: '#f0f0f0',
    fontWeight: 'bold',
  },
  btnLoginPaypal: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default Payment;
