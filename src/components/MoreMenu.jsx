import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

const MoreMenu = ({ anchorEl, handleCloseMenu, actions, isOpen }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(1,74,91,0.12)',
          minWidth: '180px',
          fontFamily: 'Cairo',
        },
      }}
    >
      {actions?.map((action, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            action.onClick();
            handleCloseMenu();
          }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // 🔥 عربي
            flexDirection: 'row-reverse', // 🔥 أيقونة يمين
            gap: 1,
            fontSize: '14px',
            color: action.danger ? '#d32f2f' : '#374151',

            '&:hover': {
              backgroundColor: action.danger
                ? 'rgba(211,47,47,0.08)'
                : 'rgba(1,74,91,0.05)',
            },
          }}
        >
          <ListItemText>{action.label}</ListItemText>

          <ListItemIcon
            sx={{
              minWidth: 'auto',
              color: action.danger ? '#d32f2f' : 'var(--main-color)',
            }}
          >
            {action.icon}
          </ListItemIcon>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MoreMenu;
