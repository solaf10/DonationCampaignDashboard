import PageContainer from './PageContainer';
import PageTable from './PageTable';
import './ContentWithTable.css';
import ControlLocationModal from '../pages/ControlLocationModal';

const ContentWithTable = ({ columns, rows, className, children, pageLink }) => {
  return (
    <div className={'table-content ' + className}>
      <div className='filters-holder'>{children}</div>
      <PageTable rows={rows} columns={columns} pageLink={pageLink} />
    </div>
  );
};

export default ContentWithTable;
