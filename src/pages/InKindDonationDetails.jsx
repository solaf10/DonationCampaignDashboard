
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
  Paper,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import InKindDonationDetailsSkelton from '../components/Skeletons/InKindDonationDetailsSkelton';
// import donationsData from '../components/data/InKindDonationData';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InKindDonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
const [donation, setDonation] = useState(null);
const [loading, setLoading] = useState(true);
  // const donation = donationsData.find((item) => item.uuid === Number(id));
  const [lightboxImg, setLightboxImg] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(
    donation?.delivery_status || '',
  );
useEffect(() => {
  fetchDonation();
}, [id]);

const fetchDonation = async () => {
  try {
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

    const item = response.data.data.find(
      (d) => d.uuid === id
    );

    const formatted = {
      uuid: item.uuid,
      donor_name: item.user?.name,
      email: item.user?.email,
      phone: item.user?.phone,
      user_type: item.user?.type,

      donation_name: item.name_of_material,
      donation_type: item.type,
      location: item.governorate?.governorate_name,
      quantity: item.amount,
      item_condition: item.status_of_materail,

      delivery_status:
        item.status === 'تم استلامه'
          ? 'تم التسليم'
          : 'لم يتم التسليم',

      images:
        item.images?.map(
          (img) => `http://127.0.0.1:8000${img.url}`
        ) || [],
    };

    setDonation(formatted);
    setDeliveryStatus(formatted.delivery_status);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  if (loading) {
  return <InKindDonationDetailsSkelton />;
}
  if (!donation) {
    return (
      <Box p={4}>
        <Typography>التبرع غير موجود</Typography>
      </Box>
    );
  }


if (!donation) {
  return <Typography>لا يوجد بيانات</Typography>;
}
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 5 },
          py: 3,
        }}
      >
        {/* Breadcrumb */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
          }}
        >
          <Typography
            fontWeight={700}
            onClick={() => navigate(-1)}
            sx={{
              color: '#C7BFB6',
              cursor: 'pointer',
            }}
          >
            إدارة التبرعات العينية
          </Typography>

          <ChevronRightIcon
            sx={{
              color: '#C7BFB6',
            }}
          />

          <Typography
            fontWeight={700}
            sx={{
              color: 'var(--main-color)',
            }}
          >
            {donation.donation_name}
          </Typography>
        </Box>

        {/*   البروفايل + صورة التبرع */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row-reverse',
            },
            height: {
              xs: 280,
              md: '60vh',
            },
            gap: 2,
            mb: 4,
          }}
        >
          {/* بطاقة المستخدم */}
          <Card
            sx={{
              width: { xs: '100%', md: 280 },
              borderRadius: 5,
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                background:
                  'linear-gradient(135deg, var(--main-color) 0%, #4CAF50 100%)',
                height: 90,
              }}
            />

            <Box
              sx={{
                mt: '-50px',
                textAlign: 'center',
              }}
            >
              <Avatar
                src={donation.profile_image}
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  border: '5px solid white',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                }}
              />

              <Typography
                variant='h6'
                sx={{
                  mt: 0.5,
                  fontWeight: 800,
                }}
              >
                {donation.donor_name}
              </Typography>

              <Chip
                label={donation.user_type}
                size='small'
                sx={{
                  // mt: 1,
                  bgcolor: '#E8F5E9',
                  color: 'var(--main-color)',
                  fontWeight: 700,
                }}
              />

              <Divider />

              <Stack spacing={0.5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: '#F8FAFC',
                    border: '1px solid #EEF2F6',
                  }}
                >
                  <Typography variant='caption' color='text.secondary'>
                    رقم الهاتف
                  </Typography>

                  <Typography fontWeight={700} mt={0.5}>
                    {donation.phone}
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: '#F8FAFC',
                    border: '1px solid #EEF2F6',
                  }}
                >
                  <Typography variant='caption' color='text.secondary'>
                    البريد الإلكتروني
                  </Typography>

                  <Typography
                    fontWeight={700}
                    mt={0.5}
                    sx={{
                      wordBreak: 'break-word',
                    }}
                  >
                    {donation.email}
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Card>
          {/* صورة الغلاف */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              height: {
                xs: 280,
                md: '60vh',
              },
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <Box
              component='img'
              src={donation.images?.[0]}
              alt={donation.donation_name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,.45), transparent)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 4,
                color: '#fff',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                }}
              >
                <Chip
                  label={deliveryStatus}
                  sx={{
                    bgcolor:
                      deliveryStatus === 'تم التسليم' ? '#457461' : '#d32f2f',
                    color: '#fff',
                  }}
                />

                {deliveryStatus === 'لم يتم التسليم' && (
                  <IconButton
                    size='small'
                    onClick={() => setOpenStatusDialog(true)}
                    sx={{
                      bgcolor: 'rgba(255,255,255,.2)',
                      color: '#fff',

                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,.3)',
                      },
                    }}
                  >
                    <EditIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>

              <Typography variant='h3' fontWeight={700}>
                {donation.donation_name}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* المعلومات */}
    <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    width: '100%',
    mt: 3,
  }}
>
  {[
   {
  icon: <PersonIcon />,
  title: 'اسم المتبرع',
  value: donation.donor_name,
  iconBg: '#E8F5E9',
  iconColor: '#2E7D32',
},
{
  icon: <CategoryIcon />,
  title: 'نوع التبرع',
  value: donation.donation_type,
  iconBg: '#E3F2FD',
  iconColor: '#1565C0',
},
{
  icon: <LocationOnIcon />,
  title: 'الموقع',
  value: donation.location,
  iconBg: '#FFF3E0',
  iconColor: '#EF6C00',
},
{
  icon: <InventoryIcon />,
  title: 'الكمية',
  value: donation.quantity,
  iconBg: '#F3E5F5',
  iconColor: '#7B1FA2',
},
{
  icon: <CheckCircleOutlineIcon />,
  title: 'حالة المواد',
  value: donation.item_condition,
  iconBg: '#FCE4EC',
  iconColor: '#D81B60 ',
},
{
  icon: <CheckCircleOutlineIcon />,
  title: 'حالة التسليم',
  value: deliveryStatus,
  isDeliveryStatus: true,
  iconBg: '#E8F5E9',
  iconColor: '  #388E3C',
},
   
  ].map((item, i) => (
    <Box
      key={i}
      sx={{
        width: {
          xs: '100%',
          sm: 'calc(50% - 8px)',
          md: 'calc(33.333% - 11px)',
        },
      }}
    >
      <InfoCard {...item} onEdit={() => setOpenStatusDialog(true)} />
    </Box>
  ))}
</Box>
        {/* صور التبرع */}
        <Card
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 5,
            width: '100%',
            boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          }}
        >
          <Typography variant='h5' fontWeight={800} mb={4}>
            صور التبرع
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              width: '100%',
            }}
          >
            {donation.images?.map((img, index) => (
              <Box
                key={index}
                component='img'
                src={img}
                alt={`project-${index}`}
                onClick={() => setLightboxImg(img)}
                sx={{
                  flex: 1,
                  width: 0,
                  height: 260,
                  borderRadius: 4,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  transition: '0.3s',

                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                  },
                }}
              />
            ))}
          </Box>

          {lightboxImg && (
            <Box
              onClick={() => setLightboxImg(null)}
              sx={{
                position: 'fixed',
                inset: 0,
                bgcolor: 'rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                cursor: 'zoom-out',
                p: 3,
              }}
            >
              <Box
                component='img'
                src={lightboxImg}
                alt='preview'
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              />
            </Box>
          )}
        </Card>
      </Box>
      <Dialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
      >
        <DialogTitle>تأكيد التسليم</DialogTitle>

        <DialogContent>
          هل أنت متأكد من تغيير حالة التبرع إلى "تم التسليم"؟
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>إلغاء</Button>

          <Button
            variant='contained'
            color='success'
            onClick={() => {
              setDeliveryStatus('تم التسليم');
              setOpenStatusDialog(false);
            }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
function InfoCard({
  icon,
  title,
  value,
  isDeliveryStatus,
  onEdit,
  iconBg,
  iconColor,
}) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 5,
        background: '#FAFAFA',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #F1F5F9',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: iconBg,
              color: iconColor,
            }}
          >
            {icon}
          </Avatar>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                color: '#666',
                fontSize: 14,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 20,
                color: '#111827',
                lineHeight: 1.5,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>

        {isDeliveryStatus && value === 'لم يتم استلامه بعد' && (
          <IconButton
            onClick={onEdit}
            size="small"
            sx={{
              width: 30,
              height: 30,
              bgcolor: '#FCE4EC',
              color: '#D81B60',

              '&:hover': {
                bgcolor: '#F8BBD0',
              },
            }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
    </Card>
  );
}
