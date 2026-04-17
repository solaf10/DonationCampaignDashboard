import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';
import Root from '../Root';
import Dashboard from '../pages/Dashboard';
import Governments from '../pages/Governments';
import Cities from '../pages/Cities';
import Areas from '../pages/Areas';
import Campaigns from '../pages/Campaigns';
import AddCampaign from '../pages/AddCampaign';
import EditCampaign from '../pages/EditCampaign';
import CampaignsDetails from '../pages/CampaignsDetails';
import ActiveStepProvider from '../contexts/ActiveStepContext';
import AddProject from '../pages/AddProject';
import Projects from '../pages/Projects';

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
      { path: 'projects', element: <Projects /> },
      { path: 'cities', element: <Cities /> },
      { path: 'areas', element: <Areas /> },
      { path: 'campaigns', element: <Campaigns /> },
      { path: 'campaigns/:id', element: <CampaignsDetails /> },
      {
        path: 'campaigns/add',
        element: (
          <ActiveStepProvider>
            <AddCampaign />
          </ActiveStepProvider>
        ),
      },
      { path: 'campaigns/edit/:id', element: <EditCampaign /> },
      {
        path: 'projects/add',
        element: (
          <ActiveStepProvider>
            <AddProject />
          </ActiveStepProvider>
        ),
      },
      { path: 'projects-trash', element: <Projects isTrash={true} /> },
      { path: 'campaigns-trash', element: <Campaigns isTrash={true} /> },
    ],
  },
]);
