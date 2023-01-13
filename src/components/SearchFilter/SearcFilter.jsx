import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  function handleSearch(event) {
    dispatch(setFilter(event.target.value));
  }

  return <input type="search" name="search" onInput={handleSearch}></input>;
};
