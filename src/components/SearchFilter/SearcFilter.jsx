import { TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  function handleSearch(event) {
    dispatch(setFilter(event.target.value));
  }

  return (
    <TextInput
      onInput={handleSearch}
      sx={{ width: 200 }}
      placeholder="Search contact"
    />
  );
};
