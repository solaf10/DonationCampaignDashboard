import React, { useState } from 'react';
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
import donationsData from '../components/data/InKindDonationData';

export default function InKindDonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const donation = donationsData.find((item) => item.uuid === Number(id));
  const [lightboxImg, setLightboxImg] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(
    donation?.delivery_status || '',
  );

  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  if (!donation) {
    return (
      <Box p={4}>
        <Typography>التبرع غير موجود</Typography>
      </Box>
    );
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
            },
            {
              icon: <CategoryIcon />,
              title: 'نوع التبرع',
              value: donation.donation_type,
            },
            {
              icon: <LocationOnIcon />,
              title: 'الموقع',
              value: donation.location,
            },
            {
              icon: <InventoryIcon />,
              title: 'الكمية',
              value: donation.quantity,
            },
            {
              icon: <CheckCircleOutlineIcon />,
              title: 'حالة المواد',
              value: donation.item_condition,
            },
            {
              icon: <CheckCircleOutlineIcon />,
              title: 'حالة التسليم',
              value: deliveryStatus,
              isDeliveryStatus: true,
            },
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
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
function InfoCard({ icon, title, value, isDeliveryStatus, onEdit }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#E8F5E9',
              color: '#457461',
            }}
          >
            {icon}
          </Avatar>

          <Box>
            <Typography variant='caption'>{title}</Typography>

            <Typography fontWeight={700}>{value}</Typography>
          </Box>
        </Box>

        {isDeliveryStatus && value === 'لم يتم التسليم' && (
          <IconButton
            onClick={onEdit}
            size='small'
            sx={{
              width: 28,
              height: 28,
              bgcolor: '#E8F5E9',
              color: '#457461',

              '&:hover': {
                bgcolor: '#D7EED9',
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
