import { Avatar, Badge } from '@mui/material';
import './Navbar.css';
import PageContainer from './PageContainer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileModal from './ProfileModal';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <nav>
      <PageContainer>
        <div className='admin-info'>
          <Avatar
            src={
              user?.profile && user.profile !== 'null'
                ? user.profile
                : undefined
            }
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: '#d9d9d9',
            }}
            onClick={() => setIsProfileDialogOpen(true)}
          >
            {!user?.profile && <PersonIcon sx={{ fontSize: '36px' }} />}
          </Avatar>
          <div className='text'>
            <p className='name'>{user?.name}</p>
            <p className='role'>{user?.type}</p>
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
      <ProfileModal
        open={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
