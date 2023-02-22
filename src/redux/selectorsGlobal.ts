import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from './contacts/selectors';
import { selectFilter } from './filter/selectors';
import { ContactResponse } from './types';

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts: ContactResponse[], filter: string): ContactResponse[] => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
