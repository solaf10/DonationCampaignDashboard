import './Navbar.css';
import PageContainer from './Container';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  return (
    <nav>
      <PageContainer>
        <div className='admin-info'>
          <img src='/admin.jpg' alt='admin' />
          <div className='text'>
            <p className='name'>سلاف الفارس</p>
            <p className='role'>ادمين</p>
          </div>
        </div>
        <div className='actions'>
          <div className='search'>
            <img src='/search.svg' alt='' className='icon' />
            {/* <input type='text' placeholder='ادخل كلمة مفتاحية...' /> */}
            <input type='text' />
          </div>
          <div className='notifications'>
            <button>
              <NotificationsIcon className='icon' />
            </button>
          </div>
        </div>
      </PageContainer>
    </nav>
  );
};

export default Navbar;
