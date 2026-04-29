import { Box, Grid } from '@mui/material';
import './DonorsInfoCard.css';

const DonorsInfoCard = ({ size, icon, label, value, details }) => {
  return (
    <Grid size={size}>
      <Box className='box donors-info-card'>
        <div className='main-info'>
          <div className='icon-holder'>{icon}</div>
          <div className='text'>
            <h4>{label}</h4>
            <p>{value}</p>
          </div>
        </div>
        {details && (
          <div className='details'>
            <h5>{details.label}</h5>
            <p className={details.type}>{details.value}</p>
          </div>
        )}
      </Box>
    </Grid>
  );
};

export default DonorsInfoCard;
