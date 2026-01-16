import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';
import Locations from '../pages/Locations';
import Root from '../Root';
import Dashboard from '../pages/Dashboard';

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
        path: 'locations/:type',
        element: <Locations />,
      },
    ],
  },
]);
