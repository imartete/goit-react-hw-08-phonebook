import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reduceError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });
    builder.addCase(refreshUser.pending, state => {
      state.isRefreshing = true;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });
    builder.addCase(refreshUser.rejected, state => {
      state.isRefreshing = false;
    });
  },
});

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const { reduceError } = authSlice.actions;

export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
