import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getListCategory = createAsyncThunk(
  'fetchData/Category',
  async () => {
    const response = await axios.get('http://192.168.1.219:5000/api/category');
    return response.data;
  },
);

export const getListProduct = createAsyncThunk(
  'fetchData/Products',
  async (idCategory) => {
    const response = await axios.get(
      idCategory
        ? `http://192.168.1.219:5000/api/products/search_category?category_id=${idCategory}`
        : 'http://192.168.1.219:5000/api/products',
    );
    return response.data.allProduct;
  },
);

export const getListProductBySearch = createAsyncThunk(
  'fetchData/ProductBySearch',
  async (inputSearch) => {
    const response = await axios.get(
      `http://192.168.1.219:5000/api/products/search?nameproduct=${inputSearch}`,
    );
    return response.data.allProduct;
  },
);

export const authLoginGG = createAsyncThunk('auth/login', async (authtoken) => {
  const response = await axios.post(
    'http://192.168.1.219:5000/api/users/create-or-update-user',
    {
      headers: {
        authtoken,
      },
    },
  );
  return response;
});

export const paymentOrder = createAsyncThunk(
  'payment/Payment',
  async (formData) => {
    const response = await axios.post(
      'http://192.168.1.219:5000/api/order',
      formData,
    );
    return response.data.saveOrder;
  },
);

export const getListBlog = createAsyncThunk('blog/getListBlog', async () => {
  const response = await axios.get('http://192.168.1.219:5000/api/news');
  return response.data;
});

export const authRegister = createAsyncThunk(
  'register/authRegister',
  async (data) => {
    const response = await axios.post(
      'http://192.168.1.219:5000/api/users/register',
      data,
    );
    return response.data;
  },
);
const initialState = {
  auth: {
    isLogin: false,
    user: null,
    authtoken: null,
    refreshToken: null,
    emailVerifiedValue: '',
  },
  userRegister: {},
  products: [],
  productDetail: {},
  categories: [],
  cart: [],
  news: [],
  payment: {},
  isLoading: false,
  money: 0,
};
const apiSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.auth.isLogin = false;
    },
    getProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    resetCart: (state) => {
      state.cart = [];
      state.money = 0;
    },
    addCart: (state, action) => {
      const cart = state.cart;
      const index = cart.findIndex(({id}) => action.payload.id === id);
      if (index < 0) {
        cart.push(action.payload);
      } else {
        cart[index].quatity = cart[index].quatity + action.payload.quatity;
      }
      const money = cart.reduce(function (total, currentValue) {
        return total + currentValue.price * currentValue.quatity;
      }, 0);
      state.cart = cart;
      state.money = money;
    },
    removeCartByID: (state, action) => {
      const cart = state.cart;
      state.cart = cart.filter((item) => item.id !== action.payload);
      state.money = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.price * currentValue.quatity,
        0,
      );
    },
    favoritesProductByID: (state, action) => {
      const products = state.products;
      const index = products.findIndex(({id}) => action.payload === id);
      if (index >= 0) {
        products[index].favorites = true;
      }
      state.products = products;
    },
    removeFavoriteProductByID: (state, action) => {
      const products = state.products;
      const index = products.findIndex(({id}) => action.payload === id);
      if (index >= 0) {
        products[index].favorites = false;
      }
      state.products = products;
    },
    increaseCartByID: (state, action) => {
      const cart = state.cart;
      const index = cart.findIndex(({id}) => action.payload === id);
      if (index >= 0) {
        cart[index].quatity = cart[index].quatity + 1;
      }
      state.cart = cart;
      state.money = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.price * currentValue.quatity,
        0,
      );
    },
    decrementCartByID: (state, action) => {
      const cart = state.cart;
      const index = cart.findIndex(({id}) => action.payload === id);
      if (index >= 0) {
        cart[index].quatity = cart[index].quatity - 1;
      }
      if (cart[index].quatity === 0) {
        cart.splice(index, 1);
      }
      state.cart = cart;
      state.money = state.cart.reduce(
        (total, currentValue) =>
          total + currentValue.price * currentValue.quatity,
        0,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginGG.fulfilled, (state, action) => {
        state.auth.isLogin = true;
        state.auth.user = action.payload;
      })
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.isLoading = false;
      })
      .addCase(getListCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListCategory.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(getListProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getListProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListProduct.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(getListProductBySearch.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getListProductBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListProductBySearch.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentOrder.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.isLoading = false;
      })
      .addCase(getListBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.allNews;
      })
      .addCase(getListBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListBlog.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRegister = action.payload;
      })
      .addCase(authRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authRegister.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export const {
  logout,
  getProductDetail,
  addCart,
  resetCart,
  removeCartByID,
  favoritesProductByID,
  increaseCartByID,
  decrementCartByID,
} = apiSlice.actions;
export default apiSlice.reducer;
