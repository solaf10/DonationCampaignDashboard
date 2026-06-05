import { useState } from 'react';
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
import initialDonations from '../components/data/InKindDonationData';
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
  const [donations, setDonations] = useState(initialDonations);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const handleOpenDialog = (id) => {
    setSelectedDonation(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDonation(null);
  };
  const handleConfirmDelivery = () => {
    setDonations((prev) =>
      prev.map((item) =>
        item.uuid === selectedDonation
          ? { ...item, delivery_status: 'تم التسليم' }
          : item,
      ),
    );
    handleCloseDialog();
  };
  const rows = donations
    .filter(
      (item) =>
        item.donor_name.includes(search) ||
        item.donation_name.includes(search) ||
        item.donation_type.includes(search) ||
        item.location.includes(search),
    )
    .map((item) => ({
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
                item.delivery_status === 'تم التسليم' ? '#2E7D32' : '#D32F2F',
              backgroundColor:
                item.delivery_status === 'تم التسليم' ? '#E8F5E9' : '#FDECEC',
            }}
          >
            {item.delivery_status}
          </span>

          {item.delivery_status === 'لم يتم التسليم' ? (
            <Tooltip title='تأكيد الاستلام'>
              <IconButton
                size='small'
                onClick={() => handleOpenDialog(item.uuid)}
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

      <div className='table-content in-kind-donations'>
        {/* filter holder */}
        <div className='filters-holder'>
          <CustomInput
            inputType='textField'
            placeholder='ابحث عن طريق اسم المتبرع    '
            styles={{
              width: '400px',
              height: 'auto',
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)',
              },
            }}
            value={search}
            setValue={setSearch}
          />
          <p>عدد التبرعات: {rows.length}</p>
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
    </PageContainer>
  );
};

export default InKindDonations;
