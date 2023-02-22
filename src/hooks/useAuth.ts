import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectError,
} from '../redux/user/selectors';
import { useAppSelector } from './typedHooks';

export function useAuth() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectError);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    error,
  };
}
