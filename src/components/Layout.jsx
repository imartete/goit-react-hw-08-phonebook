import { Outlet, Link } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { NavLink, Burger, Button, MediaQuery, Text } from '@mantine/core';
import { AppShell, Navbar, Header } from '@mantine/core';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/user/operations';
import {
  IconAddressBook,
  IconHome2,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons';

export function Layout() {
  const [opened, setOpened] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const dispatch = useDispatch();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <NavLink
            label="Home"
            icon={<IconHome2 size={20} stroke={1.5} />}
            component={Link}
            to="/"
            onClick={() => setOpened(o => !o)}
          />
          {isLoggedIn && (
            <NavLink
              label="Contacts"
              icon={<IconAddressBook size={20} stroke={1.5} />}
              component={Link}
              to="/contacts"
              onClick={() => setOpened(o => !o)}
            />
          )}
          {isLoggedIn ? (
            <>
              <p>Welcome, {user.name}</p>
              <Button
                type="button"
                onClick={() => dispatch(logOut())}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                component={Link}
                label="Register"
                icon={<IconUserPlus size={20} stroke={1.5} />}
                to="/register"
                onClick={() => setOpened(o => !o)}
              />
              <NavLink
                component={Link}
                label="Log In"
                icon={<IconLogin size={20} stroke={1.5} />}
                to="/login"
                onClick={() => setOpened(o => !o)}
              />
            </>
          )}
        </Navbar>
      }
      // footer={
      //   <Footer height={60} p="md">
      //     Footer
      //   </Footer>
      // }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Phonebook</Text>
          </div>
        </Header>
      }
    >
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </AppShell>
  );
}
