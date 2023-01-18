import React, { useEffect } from 'react';
import { lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { Layout } from 'components/Layout';
import { PrivateRoute } from 'components/PrivateRoute';
import { refreshUser } from 'redux/user/operations';
import { useAuth } from 'hooks/useAuth';
import { MantineProvider } from '@mantine/core';

const HomePage = lazy(() => import('./pages/Home'));
const RegisterPage = lazy(() => import('./pages/Register'));
const LoginPage = lazy(() => import('./pages/Login'));
const ContactsPage = lazy(() => import('./pages/Contacts'));

export function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',

        components: {
          Button: {
            defaultProps: {
              size: 'xs',
              color: 'cyan',
            },
          },
        },

        defaultGradient: {
          from: 'orange',
          to: 'red',
          deg: 45,
        },
        colors: {
          deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        },

        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },

        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: { fontSize: 30 },
          },
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {isRefreshing ? (
        <p>Refreshing user...</p>
      ) : (
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
        </Routes>
      )}
    </MantineProvider>
  );
}
