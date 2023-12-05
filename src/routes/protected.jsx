import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// UI Components
import Box from '@mui/material/Box';

import { Spinner } from '../components/Spinner';
// import { MainLayout } from '@/components/Layout';
import { lazyImport } from '../utils/lazyImport';

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes'
// );

// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { MessagesRoutes } = lazyImport(() => import('../features/message/routes'), 'MessagesRoutes');
// const { Users } = lazyImport(() => import('../features/message'), 'Users');


const MainLayout = ({children}) => (
    <div>{children}</div>
)

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <Box className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
    //   { path: '/users', element: <Users /> },
      { path: '/message/*', element: <MessagesRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
