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
import ProjectsDetails from '../pages/ProjectsDetails';
import Organizations from '../pages/Organizations';
import BusinessDonars from '../pages/businessDonars';
import Donars from '../pages/Donars';
import ProtectedRoute from '../utils/ProtectedRoute';
import AddProjectAdditionalSteps from '../pages/AddProjectAdditionalSteps';
import { FiltersProvider } from '../contexts/FilterContext';
import InKindDonations from '../pages/InKindDonations';
import InKindDonationDetails from '../pages/InKindDonationDetails';
import IndividualDonars from '../pages/IndividualDonars';
import FinancialOperations from '../pages/FinancialOperations';
import AddFinancialOperations from '../pages/AddFinancialOperations';
import EditProject from '../pages/EditProject';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },

  // Protected Routes
  {
    element: (
      <FiltersProvider>
        <ActiveStepProvider>
          <ProtectedRoute />
        </ActiveStepProvider>
      </FiltersProvider>
    ),
    children: [
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
          { path: 'projects/:id', element: <ProjectsDetails /> },
          { path: 'cities', element: <Cities /> },
          { path: 'areas', element: <Areas /> },
          { path: 'campaigns', element: <Campaigns /> },
          { path: 'campaigns/:id', element: <CampaignsDetails /> },

          {
            path: 'campaigns/add',
            element: <AddCampaign />,
          },

          {
            path: 'campaigns/edit/:id',
            element: <EditCampaign />,
          },

          {
            path: 'projects/add',
            element: <AddProject />,
          },
          {
            path: 'projects/add/additional/:id',
            element: (
              <ActiveStepProvider>
                <AddProjectAdditionalSteps />
              </ActiveStepProvider>
            ),
          },

          {
            path: 'projects/edit/:id',
            element: <EditProject />,
          },

          {
            path: 'inKindDonation',
            element: <InKindDonations />,
          },
          {
            path: 'inKindDonation/:id',
            element: <InKindDonationDetails />,
          },

          /* Trash */
          {
            path: 'projects-trash',
            element: <Projects isTrash={true} />,
          },
          {
            path: 'financial-operations',
            element: <FinancialOperations />,
          },
          {
            path: 'financial-operations/add',
            element: <AddFinancialOperations />,
          },
          {
            path: 'campaigns-trash',
            element: <Campaigns isTrash={true} />,
          },

          /* Donars */
          {
            path: 'donars',
            element: <Donars />,
          },

          {
            path: 'individuals',
            element: <IndividualDonars />,
          },

          {
            path: 'organizations',
            element: <Organizations />,
          },

          {
            path: 'business',
            element: <BusinessDonars />,
          },
        ],
      },
    ],
  },
]);
