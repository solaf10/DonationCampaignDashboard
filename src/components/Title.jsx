import { Chip } from '@mui/material';

const Title = ({ pageTitle, subtitle, status, children }) => {
  return (
    <div className='title'>
      <div className='text'>
        <h1>{pageTitle}</h1>
        {subtitle !== null &&
          (status ? (
            <Chip
              label={subtitle}
              sx={
                status == 'ongoing'
                  ? {
                      backgroundColor: '#E7F5E8',
                      color: '#3A8F3A',
                      border: '1px solid #CBE8CC',
                    }
                  : status == 'upcoming'
                  ? {
                      backgroundColor: '#F5EFE6',
                      color: '#7A5C2E',
                      border: '1px solid #E2D6C3',
                    }
                  : {
                      backgroundColor: '#F0F2F3',
                      color: '#4D5458',
                      border: '1px solid #D2D5D7',
                    }
              }
            />
          ) : (
            <p>{subtitle}</p>
          ))}
      </div>
      {children}
    </div>
  );
};

export default Title;
