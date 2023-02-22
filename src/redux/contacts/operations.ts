import axios, { AxiosError } from 'axios';
import { createAppAsyncThunk } from '../../hooks/typedHooks';
import { Contact, ContactResponse, KnownError } from '../types';

export const fetchContacts = createAppAsyncThunk(
  'contacts/fetchAll',
  async (_: undefined, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data as ContactResponse[];
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);

export const addContact = createAppAsyncThunk(
  'contacts/addContact',
  async (contact: Contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data as ContactResponse;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);

export const deleteContact = createAppAsyncThunk(
  'contacts/deleteContact',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data as ContactResponse;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);

export const editContact = createAppAsyncThunk(
  'contacts/editContact',
  async ({ id, name, number }: ContactResponse, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, {
        name,
        number,
      });
      return response.data as ContactResponse;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as AxiosError<KnownError>);
    }
  }
);
