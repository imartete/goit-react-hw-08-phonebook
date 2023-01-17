import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { Suspense } from 'react';

export function Layout() {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
