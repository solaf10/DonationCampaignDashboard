import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ar'>
        <Provider store={store}>
          <ToastContainer position='top-left' />
          <RouterProvider router={router} />
        </Provider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
