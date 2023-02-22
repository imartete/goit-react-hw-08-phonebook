import axios, { AxiosError } from 'axios';
import { createAppAsyncThunk } from '../../hooks/typedHooks';
import {
  KnownError,
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
} from '../types';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

interface Auth {
  user: UserLoginResponse;
  token: string;
}

const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAppAsyncThunk(
  'auth/register',
  async (credentials: UserRegisterRequest, thunkAPI) => {
    try {
      const res = await axios.post<Auth>('/users/signup', credentials);
      setAuthHeader(res.data.token as string);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);

export const logIn = createAppAsyncThunk(
  'auth/login',
  async (credentials: UserLoginRequest, thunkAPI) => {
    try {
      const res = await axios.post<Auth>('/users/login', credentials);
      setAuthHeader(res.data.token as string);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);

export const logOut = createAppAsyncThunk(
  'auth/logout',
  async (_: undefined, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);

export const refreshUser = createAppAsyncThunk(
  'auth/refresh',
  async (_: undefined, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue({
        message: 'Failed to fetch user.',
      });
    }
    try {
      setAuthHeader(persistedToken as string);
      const res = await axios.get<UserLoginResponse>('/users/current');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);
