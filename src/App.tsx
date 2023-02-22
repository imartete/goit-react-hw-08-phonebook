import React, { useEffect } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './components/RestrictedRoute';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { refreshUser } from './redux/user/operations';
import { useAuth } from './hooks/useAuth';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useAppDispatch } from './hooks/typedHooks';

const HomePage = lazy(() => import('./pages/Home'));
const RegisterPage = lazy(() => import('./pages/Register'));
const LoginPage = lazy(() => import('./pages/Login'));
const ContactsPage = lazy(() => import('./pages/Contacts'));

export function App() {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <MantineProvider
      theme={{
        components: {
          Flex: {
            defaultProps: { gap: 'md', direction: 'column' },
          },

          Button: {
            defaultProps: { color: 'indigo', size: 'md' },
          },

          TextInput: {
            defaultProps: { size: 'md' },
          },
          PasswordInput: {
            defaultProps: {
              size: 'md',
            },
          },
        },
        colorScheme: 'dark',
        defaultGradient: { deg: 65, from: 'indigo', to: '#A5D8FF' },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {isRefreshing ? (
        <p>Refreshing user...</p>
      ) : (
        <NotificationsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<RegisterPage />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<ContactsPage />}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </NotificationsProvider>
      )}
    </MantineProvider>
  );
}
