import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { Burger, Button, MediaQuery, Text, Tabs, Flex } from '@mantine/core';
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
import { useScrollLock } from '@mantine/hooks';

export function Layout() {
  const [opened, setOpened] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [scrollLocked, setScrollLocked] = useScrollLock();

  scrollLocked ?? console.log('Just using this variable, ehe');

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Tabs
          defaultValue="/"
          value={tabValue}
          onTabChange={value => navigate(`${value}`)}
          color="indigo"
          orientation="vertical"
          placement="right"
        >
          <Tabs.List>
            <Navbar
              p="xs"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Tabs.Tab
                value="/"
                onClick={() => {
                  setOpened(o => !o);
                  setScrollLocked(c => !c);
                }}
                icon={<IconHome2 size={20} stroke={1.5} />}
              >
                <Text fz="xl" fw={700}>
                  Home
                </Text>
              </Tabs.Tab>

              {isLoggedIn && (
                <Tabs.Tab
                  value="/contacts"
                  onClick={() => {
                    setOpened(o => !o);
                    setScrollLocked(c => !c);
                  }}
                  icon={<IconAddressBook size={20} stroke={1.5} />}
                >
                  <Text fz="xl" fw={700}>
                    Contacts
                  </Text>
                </Tabs.Tab>
              )}
              {!isLoggedIn ? (
                <>
                  <Tabs.Tab
                    value="/register"
                    onClick={() => {
                      setOpened(o => !o);
                      setScrollLocked(c => !c);
                    }}
                    icon={<IconUserPlus size={20} stroke={1.5} />}
                  >
                    <Text fz="xl" fw={700}>
                      Register
                    </Text>
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="/login"
                    onClick={() => {
                      setOpened(o => !o);
                      setScrollLocked(c => !c);
                    }}
                    icon={<IconLogin size={20} stroke={1.5} />}
                  >
                    <Text fz="xl" fw={700}>
                      Sign In
                    </Text>
                  </Tabs.Tab>
                </>
              ) : (
                <Flex
                  sx={{ marginTop: 'auto', marginBottom: 20 }}
                  direction="column"
                  gap="md"
                >
                  <Text fz="lg" fw={500} color="indigo">
                    Hi, {user.name}! :D
                  </Text>
                  <Button
                    variant="light"
                    width="100%"
                    color="indigo"
                    size="lg"
                    onClick={() => dispatch(logOut())}
                  >
                    Sign out
                  </Button>
                </Flex>
              )}
            </Navbar>
          </Tabs.List>
        </Tabs>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => {
                  setOpened(o => !o);
                  setScrollLocked(c => !c);
                }}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <Text
              variant="gradient"
              gradient={{ from: 'indigo', to: '#A5D8FF', deg: 70 }}
              fz="xl"
              fw={500}
            >
              PhoneBO.Ok
            </Text>
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
