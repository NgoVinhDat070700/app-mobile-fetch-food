/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react/react-in-jsx-scope */
import {Formik} from 'formik';
import {useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {authRegister} from '../redux/api/apiSlice';

export default function Register({navigation}) {
  const [hidePassword, setHidePassword] = useState('');
  const dispatch = useDispatch();
  const handleRegister = async (values) => {
    if (values.password === values.retypePassword) {
      const result = await dispatch(authRegister(values));
      if (authRegister.fulfilled.match(result)) {
        alert('Register Success!');
        navigation.navigate('Login');
      } else {
        alert('Register Thất bại!');
      }
    } else {
      alert('Password và retypePassword không giống nhau!');
    }
  };

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Text style={styles.header}> Đăng nhập</Text> */}
        <Image
          source={require('../assets/fetch_logo_text.png')}
          style={styles.Image}
        />
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            retypePassword: '',
          }}
          onSubmit={handleRegister}>
          {({handleSubmit, handleChange}) => (
            <>
              <View
                style={{
                  height: 60,
                  alignSelf: 'stretch',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="UserName"
                  onChangeText={handleChange('username')}
                  testID="username"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View
                style={{
                  height: 60,
                  alignSelf: 'stretch',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  testID="email"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View
                style={{
                  height: 60,
                  alignSelf: 'stretch',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <TextInput
                  returnKeyType="go"
                  keyboardType="default"
                  style={styles.textInput}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  testID="password"
                  // onChangeText={this.props.password}
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                  // activeOpacity={0.8}
                  style={styles.showPassword}>
                  <Image
                    source={
                      hidePassword
                        ? require('../assets/hide.png')
                        : require('../assets/show.png')
                    }
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 60,
                  alignSelf: 'stretch',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <TextInput
                  returnKeyType="go"
                  keyboardType="default"
                  style={styles.textInput}
                  placeholder="Retype Password"
                  onChangeText={handleChange('retypePassword')}
                  testID="retypePassword"
                  // onChangeText={this.props.password}
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                  // activeOpacity={0.8}
                  style={styles.showPassword}>
                  <Image
                    source={
                      hidePassword
                        ? require('../assets/hide.png')
                        : require('../assets/show.png')
                    }
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={handleSubmit}
                testID="btnSubmit">
                <Text>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <View style={{flex: 1, marginLeft: 13}}>
            <Text
              onPress={handleNavigateLogin}
              style={
                (styles.textSignup,
                {
                  fontWeight: 'bold',
                  color: '#cccccc',
                  fontSize: 19,
                  alignSelf: 'flex-start',
                  // alignItems: 'flex-end',
                })
              }>
              Login !!
            </Text>
          </View>

          <View style={{flex: 1, marginRight: 12}}>
            <Text
              onPress={() => this.props.navigation.navigate('ForgotPassword')}
              style={{
                fontWeight: 'bold',
                color: '#cccccc',
                fontSize: 19,
                alignSelf: 'flex-end',
              }}>
              Quên mật khẩu!
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 5,
            color: '#cccccc',
            fontSize: 20,
            // alignSelf: 'stretch',
            alignItems: 'center',
            marginLeft: 15,
          }}>
          ------------------------ Hoặc --------------------------
        </Text>
        <TouchableOpacity style={styles.btnLoginGG}>
          <Image
            source={require('../assets/google.png')}
            style={{
              position: 'absolute',
              height: 40,
              width: 40,
              marginTop: 10,
              alignSelf: 'flex-start',
            }}
          />
          <Text style={{color: '#696969'}}>Đăng nhập với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLoginFB}
          onPress={() => this._signInFB()}>
          <Image
            source={require('../assets/facebook.png')}
            style={{
              position: 'absolute',
              height: 40,
              width: 40,
              alignSelf: 'flex-start',
            }}
          />
          <Text style={{color: '#f0f0f0'}}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFACD',
    // paddingHorizontal: 40,
  },
  wrapper: {
    flex: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  textInput: {
    //flex:1,
    height: 60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  showPassword: {
    position: 'absolute',
    right: width * 0.05,
    height: 60,
    width: 40,
    justifyContent: 'center',
    // height: 1,
    // width: 1,
    // padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  btnLogin: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  btnLoginGG: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  btnLoginFB: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  textLogin: {
    color: '#fff',
    fontSize: 20,
  },
  textSignup: {
    color: '#cccccc',
    textAlign: 'center',
  },
  Image: {
    marginBottom: 20,
    width: width * 0.2,
    height: width * 0.2,
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.9,
  },
});
