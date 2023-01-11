import { useDispatch } from 'react-redux';
import { getFilter } from 'redux/filter/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  function handleSearch(event) {
    dispatch(getFilter(event.target.value));
  }

  return <input type="search" name="search" onInput={handleSearch}></input>;
};
