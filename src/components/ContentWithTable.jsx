import PageContainer from './PageContainer';
import PageTable from './PageTable';
import './ContentWithTable.css';
import { useLocation } from 'react-router-dom';
import ControlLocationModal from '../pages/ControlLocationModal';

const ContentWithTable = ({
  columns,
  rows,
  className,
  children,
  pageLink,
  setIsOpen,
  isOpen,
}) => {
  const pathname = useLocation().pathname;
  const pathnameArr = pathname.split('/');
  const locationType = pathnameArr[pathnameArr.length - 1];

  return (
    <>
      <div className={'table-content ' + className}>
        <div className='filters-holder'>{children}</div>
        <PageTable rows={rows} columns={columns} pageLink={pageLink} />
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
