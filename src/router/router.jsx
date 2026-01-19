import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';
import Root from '../Root';
import Dashboard from '../pages/Dashboard';
import Governments from '../pages/Governments';
import Cities from '../pages/Cities';
import Areas from '../pages/Areas';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    /* children: [
      {
        path: '',
        element: <LogIn />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ], */
  },
  {
    path: '/content',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'governments',
        element: <Governments />,
      },
      { path: 'cities', element: <Cities /> },
      { path: 'areas', element: <Areas /> },
    ],
  },
]);
