// import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// // routes

// //

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decoded = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;

//   return decoded.exp > currentTime;
// };

// const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(() => {
//     handleRefreshToken();
//   }, timeLeft);
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     AsyncStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.post['Content-Type'] = 'application/json';
//     axios.defaults.headers.post['Accept'] = 'application/json';
//     axios.defaults.headers.common['token'] = `Bearer ${accessToken}`;
//     // This function below will handle when token is expired
//     const {exp} = jwtDecode(accessToken); // ~5 days by minimals server
//     handleTokenExpired(exp);
//   } else {
//     AsyncStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// const setRefreshToken = (refreshToken) => {
//   if (refreshToken) {
//     AsyncStorage.setItem('refreshToken', refreshToken);
//   } else {
//     AsyncStorage.removeItem('refreshToken');
//   }
// };

// const handleRefreshToken = async () => {
//   try {
//     const isRememberMe = JSON.parse(AsyncStorage.getItem('isRememberMe'));

//     if (!isRememberMe) {
//       AsyncStorage.removeItem('accessToken');
//       AsyncStorage.removeItem('refreshToken');
//       return;
//     }

//     const refreshToken = AsyncStorage.getItem('refreshToken');
//     const {data: {accessToken} = {}} = await axios.post(
//       'http://192.168.1.219:5000/api/users/refresh',
//       null,
//       {
//         headers: {
//           'X-Refresh-Token': refreshToken,
//         },
//       },
//     );
//     setSession(accessToken);
//     window.location.reload();
//   } catch (error) {
//     //  TODO
//   }
// };
// const getUserInfo = async (accessToken) => {
//   const decoded = jwtDecode(accessToken);
//   const {
//     _id = '',
//     email = '',
//     username = '',
//     isAdmin = false,
//   } = await axios.get(`http://192.168.1.219:5000/api/users/find/${decoded.id}`);
//   return {
//     _id,
//     email,
//     username,
//     isAdmin,
//   };
// };
// export {
//   isValidToken,
//   setSession,
//   setRefreshToken,
//   handleRefreshToken,
//   getUserInfo,
// };
