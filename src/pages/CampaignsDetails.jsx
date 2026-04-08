import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { Delete, EditCalendarRounded } from '@mui/icons-material';
import './CampaignsDetails.css';

const CampaignsDetails = () => {
  return (
    <div className='campaign-details'>
      <PageContainer>
        <div className='title'>
          <div className='text'>
            <h1>حملة التعليم</h1>
            <p>نشطة</p>
          </div>
          <div className='btns'>
            <Link to='/content/campaigns/edit/1' className='button'>
              <EditCalendarRounded className='icon' />
              <span>تعديل</span>
            </Link>
            <button className='button delete'>
              <Delete className='icon' />
              <span>حذف</span>
            </button>
          </div>
        </div>
        <div className='box desc'>
          <img src='/Goal.png' alt='goal' className='icon' />
          <p>
            تهدف الحملة الى إعادة إعمار سوريا عملية ضخمة ومتعددة الأوجه تتطلب
            استثمارات تقدر بمئات المليارات من الدولارات (تقديرات البنك الدولي
            تشير إلى 216 مليار دولار كحد أدنى، بينما التوقعات قد تصل إلى 900
            مليار دولار)، وتشمل بناء البنية التحتية (مدارس، مستشفيات، طرق، شبكات
            كهرباء ومياه)، وتطوير الاقتصاد والقطاعات الإنتاجية (صناعة وزراعة)،
            وإعادة بناء النسيج الاجتماعي . 
          </p>
        </div>
      </PageContainer>
    </div>
  );
};

export default CampaignsDetails;
