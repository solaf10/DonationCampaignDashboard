import PageContainer from './PageContainer';
import PageTable from './PageTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import './ContentWithTable.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ControlLocationModal from '../pages/ControlLocationModal';

const ContentWithTable = ({
  pageTitle,
  subtitle,
  buttonTitle,
  columns,
  rows,
  className,
  children,
  pageLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useLocation().pathname;
  const pathnameArr = pathname.split('/');
  const locationType = pathnameArr[pathnameArr.length - 1];

  return (
    <>
      <div className={'table-content ' + className}>
        <PageContainer>
          <div className='title'>
            <div className='text'>
              <h1>{pageTitle}</h1>
              {subtitle !== null && <p>{subtitle}</p>}
            </div>
            {pageLink ? (
              <Link to={pageLink + '/add'} className='btn'>
                <span>إضافة {buttonTitle}</span>
                <AddRoundedIcon />
              </Link>
            ) : (
              <button onClick={() => setIsOpen(true)} className='btn'>
                <span>إضافة {buttonTitle}</span>
                <AddRoundedIcon />
              </button>
            )}
          </div>
          <div className='filters-holder'>{children}</div>
          <PageTable rows={rows} columns={columns} pageLink={pageLink} />
        </PageContainer>
      </div>
      {!pageLink && (
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
      )}
    </>
  );
};

export default ContentWithTable;
