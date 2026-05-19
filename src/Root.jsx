import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const Root = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className='content-holder'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
