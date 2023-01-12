import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from './contacts/selectors';
import { selectFilter } from './filter/selectors';

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
