import PageContainer from './PageContainer';
import PageTable from './PageTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import './Locations.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ControlLocationModal from '../pages/ControlLocationModal';

const Locations = ({
  subtitle,
  buttonTitle,
  columns,
  rows,
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useLocation().pathname;
  const pathnameArr = pathname.split('/');
  const locationType = pathnameArr[pathnameArr.length - 1];

  return (
    <>
      <div className={'locations ' + className}>
        <PageContainer>
          <div className='title'>
            <div className='text'>
              <h1>إدارة الموقع(المكان)</h1>
              <p>{subtitle}</p>
            </div>
            <button onClick={() => setIsOpen(true)} className='btn'>
              <span>إضافة {buttonTitle}</span>
              <AddRoundedIcon />
            </button>
          </div>
          <div className='filters-holder'>{children}</div>
          <PageTable rows={rows} columns={columns} />
        </PageContainer>
      </div>
      <ControlLocationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`إضافة ${
          locationType == 'cities'
            ? 'مدينة'
            : locationType == 'areas'
            ? 'منطقة'
            : 'محافظة'
        }`}
        locationType={locationType}
      />
    </>
  );
};

export default Locations;
