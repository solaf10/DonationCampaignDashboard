import { Container } from '@mui/material';

const PageContainer = ({ children }) => (
  <Container
    className='container'
    maxWidth='lg'
    disableGutters
    sx={{ px: '16px' }}
  >
    {children}
  </Container>
);
export default PageContainer;
