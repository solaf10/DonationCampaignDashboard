import PageContainer from './PageContainer';
import PageTable from './PageTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import './Locations.css';

const Locations = ({
  subtitle,
  buttonTitle,
  columns,
  rows,
  className,
  children,
}) => {
  return (
    <div className={'locations ' + className}>
      <PageContainer>
        <div className='title'>
          <div className='text'>
            <h1>إدارة الموقع(المكان)</h1>
            <p>{subtitle}</p>
          </div>
          <button className='btn'>
            <span>إضافة {buttonTitle}</span>
            <AddRoundedIcon />
          </button>
        </div>
        <div className='filters-holder'>{children}</div>
        <PageTable rows={rows} columns={columns} />
      </PageContainer>
    </div>
  );
};

export default Locations;
