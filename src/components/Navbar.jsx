import { Badge } from '@mui/material';
import './Navbar.css';
import PageContainer from './PageContainer';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  return (
    <nav>
      <PageContainer>
        <div className='admin-info'>
          <img src='/admin.jpg' alt='admin' />
          <div className='text'>
            <p className='name'>بتول عبدالهادي</p>
            <p className='role'>مسؤول</p>
          </div>
        </div>
        <div className='actions'>
          <div className='search'>
            <img src='/search.svg' alt='' className='icon' />
            {/* <input type='text' placeholder='ادخل كلمة مفتاحية...' /> */}
            <input type='text' />
          </div>
          <div className='notifications'>
            <Badge
              className='notification-badge'
              badgeContent={1}
              max={99}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#9b2c2c',
                  color: '#fff',
                  fontFamily: 'Cairo',
                  fontSize: '11px',
                },
              }}
            >
              <NotificationsIcon className='icon' />
            </Badge>
          </div>
        </div>
      </PageContainer>
    </nav>
  );
};

export default Navbar;
