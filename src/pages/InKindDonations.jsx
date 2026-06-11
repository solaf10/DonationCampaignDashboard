import { useState, useEffect } from 'react';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import CustomInput from '../components/locations/CustomInput';
import PageTable from '../components/PageTable';
import InKindDonationSkeleton from '../components/Skeletons/InKindDonationSkelton';
// import initialDonations from '../components/data/InKindDonationData';
import InKindDonationFilterDrawer from '../components/InKindDonationFilterDrawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
const columns = [
  { id: 'donor_name', label: 'اسم المتبرع' },
  { id: 'donation_name', label: 'اسم التبرع' },
  { id: 'donation_type', label: 'نوع التبرع' },
  { id: 'location', label: 'الموقع' },
  { id: 'quantity', label: 'الكمية' },
  { id: 'image', label: 'صورة التبرع' },
  { id: 'item_condition', label: 'حالة المواد' },
  { id: 'delivery_status', label: 'حالة التسليم' },
];

const InKindDonations = () => {
  const [search, setSearch] = useState('');
  // const [donations, setDonations] = useState(initialDonations);
  const [donations, setDonations] = useState([]);
const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [donationTypes, setDonationTypes] = useState([]);
  const [deliveryStatuses, setDeliveryStatuses] = useState([]);
  const [itemConditions, setItemConditions] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [filters, setFilters] = useState({
  donationType: '',
  location: '',
  itemCondition: '',
  deliveryStatus: '',
});
const fetchGovernorates = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      'http://127.0.0.1:8000/api/governorates/all',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    setGovernorates(response.data.data);
  } catch (error) {
    console.error('Error fetching governorates:', error);
  }
};
const applyFilters = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      'http://127.0.0.1:8000/api/donation/filter',
      {
        governorate_uuid: filters.location || null,
        type: filters.donationType || null,
        status: filters.deliveryStatus || null,
        status_of_materail: filters.itemCondition || null,
        name: search || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    const formattedData = response.data.data.map((item) => ({
      uuid: item.uuid,
      donor_name: item.user?.name || '',
      donation_name: item.name_of_material || '',
      donation_type: item.type || '',
      location: item.governorate?.governorate_name || '',
      quantity: item.amount || 0,
      item_condition: item.status_of_materail || '',
      delivery_status: item.status || '',
      images:
        item.images?.map(
          (img) => `http://127.0.0.1:8000${img.url}`
        ) || [],
    }));

    setDonations(formattedData);
  } catch (error) {
    console.error('Filter Error:', error);
  }
};
const fetchItemConditions = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      'http://127.0.0.1:8000/api/donation/statusofmaterail',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    setItemConditions(response.data.data);
  } catch (error) {
    console.error('Error fetching item conditions:', error);
  }
};
const fetchDeliveryStatuses = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      'http://127.0.0.1:8000/api/donation/status',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    setDeliveryStatuses(response.data.data);
  } catch (error) {
    console.error('Error fetching delivery statuses:', error);
  }
};
  const fetchDonationTypes = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      'http://127.0.0.1:8000/api/donation/type',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    setDonationTypes(response.data.data);
  } catch (error) {
    console.error('Error fetching donation types:', error);
  }
};
useEffect(() => {
  fetchDonations();
  fetchDonationTypes();
  fetchDeliveryStatuses();
  fetchItemConditions();
  fetchGovernorates();
}, []);
useEffect(() => {
  applyFilters();
}, [filters]);
useEffect(() => {
  const timeout = setTimeout(() => {
    applyFilters();
  }, 500);

  return () => clearTimeout(timeout);
}, [search]);
const fetchDonations = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem('token');

    const response = await axios.get(
      'http://127.0.0.1:8000/api/donation/all',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
  

    const formattedData = response.data.data.map((item) => ({
      uuid: item.uuid,
      donor_name: item.user?.name || '',
      donation_name: item.name_of_material || '',
      donation_type: item.type || '',
      location: item.governorate?.governorate_name || '',
      quantity: item.amount || 0,
      item_condition: item.status_of_materail || '',
      delivery_status:
        item.status === 'تم استلامه'
          ? 'تم استلامه'
          : 'لم يتم استلامه بعد',
      images:
        item.images?.map(
          (img) => `http://127.0.0.1:8000${img.url}`
        ) || [],
    }));

    setDonations(formattedData);
  } catch (error) {
    console.error('Error fetching donations:', error);
  } finally {
    setLoading(false);
  }
};
  const handleOpenDialog = (id) => {
    setSelectedDonation(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDonation(null);
  };
const handleConfirmDelivery = async () => {
  try {
    const token = localStorage.getItem('token');

    await axios.post(
      `http://127.0.0.1:8000/api/donation/update/${selectedDonation}`,
      {
        status: 'تم استلامه',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

   
    setDonations((prev) =>
      prev.map((item) =>
        item.uuid === selectedDonation
          ? { ...item, status: 'تم استلامه' }
          : item
      )
    );

    handleCloseDialog();
  } catch (error) {
    console.error('Error updating donation status:', error);
  }
};
// استدعاء skelton
 if (loading) {
  return <InKindDonationSkeleton />;
}
  const rows = donations
  .filter((item) =>
    item.donor_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item) => ({
    ...item,
  

      ...item,
      image: (
        <img
          src={item.images?.[0]}
          alt='donation'
          width={60}
          height={60}
          style={{
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      ),
      item_condition: (
        <span
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            display: 'inline-block',
            color:
              item.item_condition === 'جديدة'
                ? '#2E7D32'
                : item.item_condition === 'مستعملة'
                  ? '#ED6C02'
                  : '#616161',
            backgroundColor:
              item.item_condition === 'جديدة'
                ? '#E8F5E9'
                : item.item_condition === 'مستعملة'
                  ? '#FFF3E0'
                  : '#EEEEEE',
          }}
        >
          {item.item_condition}
        </span>
      ),

      delivery_status: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            // gap: '10px',
          }}
        >
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'inline-block',
              color:
                item.delivery_status === 'تم استلامه' ? '#2E7D32' : '#D32F2F',
              backgroundColor:
                item.delivery_status === 'تم استلامه' ? '#E8F5E9' : '#FDECEC',
            }}
          >
            {item.delivery_status}
          </span>

        {item.delivery_status ==='لم يتم التسليم بعد' ? (
  <Tooltip title='تأكيد الاستلام'>
    <IconButton
  size='small'
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpenDialog(item.uuid);
  }}
  sx={{
    backgroundColor: '#FFF3E0',
    color: '#ED6C02',

    '&:hover': {
      backgroundColor: '#FFE0B2',
    },
  }}
>
  <EditRoundedIcon fontSize='small' />
</IconButton>
  </Tooltip>
) : (
  <CheckCircleRoundedIcon color='success' />
)}
        </div>
      ),
    }));

  return (
    <PageContainer>
      <Title pageTitle='إدارة التبرعات' subtitle='التبرعات العينية' />

      <div className='table-content in-kind-donations' style={{marginBottom:"36px"}} >
        {/* filter holder */}
  <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',

    
  }}
>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
      
      
    }}
  >
    <CustomInput
      inputType='textField'
      placeholder='ابحث حسب الاسم'
      value={search}
      setValue={setSearch}
      styles={{
        width: '400px',
        
      }}
    />

    <p style={{color:"#888",     fontSize: "14px"}}>عدد التبرعات: {rows.length}</p>
  </div>

  <IconButton
    onClick={() => setOpenFilterDrawer(true)}
    sx={{
      width: 48,
      height: 48,
      backgroundColor: '#F5F5F5',
      borderRadius: '50%',

      '&:hover': {
        backgroundColor: '#EEEEEE',
      },
    }}
  >
    <FilterAltOutlinedIcon 
      sx={{
        color: '#90A4AE',
        fontSize:"18px"
      }}
    />
  </IconButton>
</div>
      </div>

      <PageTable
        rows={rows}
        columns={columns}
        pageLink='/content/inKindDonation'
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          تأكيد استلام التبرع
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: 'center',
            }}
          >
            سيتم تحديث حالة التبرع إلى
            <strong> تم التسليم </strong>
            بشكل نهائي.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'center',
            pb: 3,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            color='inherit'
            variant='outlined'
          >
            إلغاء
          </Button>

          <Button
            onClick={handleConfirmDelivery}
            variant='contained'
            color='success'
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
<InKindDonationFilterDrawer
  open={openFilterDrawer}
  onClose={() => setOpenFilterDrawer(false)}
  filters={filters}
  setFilters={setFilters}
  donationTypes={donationTypes}
  deliveryStatuses={deliveryStatuses}
  itemConditions={itemConditions}
  governorates={governorates}
/>
    </PageContainer>
  );
};

export default InKindDonations;
