import { RootState } from '../store';

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectError = (state: RootState) => state.contacts.error;
export const selectLoading = (state: RootState) => state.contacts.isLoading;
