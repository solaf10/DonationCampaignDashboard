import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Grid,
  Card,
  Typography,
  Box,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Button,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import projectsData from '../components/data/ProjectsData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === parseInt(id));
  const [lightboxImg, setLightboxImg] = useState(null);
  const [billItems, setBillItems] = useState(project.bill || []);

  if (!project) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography>المشروع غير موجود</Typography>
      </Box>
    );
  }

  const handleDelete = (indexToDelete) => {
    setBillItems(billItems.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Box
      sx={{
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          px: { xs: 2, md: 5 },
          py: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              fontWeight={700}
              onClick={() => navigate(-1)}
              sx={{
                color: '#C7BFB6',
                cursor: 'pointer',
              }}
            >
              إدارة المشاريع
            </Typography>

            <ChevronRightIcon
              sx={{
                color: '#C7BFB6',
                fontSize: 32,
              }}
            />

            <Typography
              fontWeight={700}
              sx={{
                color: 'var(--main-color)',
              }}
            >
              {project.title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant='contained'
              startIcon={<EditIcon />}
              // onClick={handleEdit}
              sx={{
                bgcolor: 'var(--main-color)',
                '&:hover': {
                  bgcolor: 'var(--main-color)',
                },
              }}
            >
              تعديل
            </Button>

            <Button
              variant='outlined'
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{
                color: '#d32f2f',
                borderColor: '#d32f2f',
                '&:hover': {
                  borderColor: '#b71c1c',
                  bgcolor: '#fff5f5',
                },
              }}
            >
              حذف
            </Button>
          </Box>
        </Box>
        {/* COVER */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 320, md: '72vh' },
            borderRadius: 5,
            overflow: 'hidden',
            mb: 4,
            boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
          }}
        >
          <Box
            component='img'
            src={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: ' rgba(0, 0, 0, 0.45);',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 3, md: 6 },
              color: 'white',
            }}
          >
            <Chip
              label={project.status}
              size='small'
              sx={{
                width: 'fit-content',
                mb: 1,
                py: 1,
                fontWeight: 700,
                bgcolor: '#457461',
                color: 'white',
              }}
            />

            <Typography
              variant='h2'
              fontWeight={700}
              sx={{
                mb: 2,
                fontSize: {
                  xs: 26,
                  md: 58,
                },
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                icon={
                  <LocationOnIcon
                    sx={{
                      color: 'white !important',
                    }}
                  />
                }
                label={project.location}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.14)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }}
              />

              <Chip
                label={project.category}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.14)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* INFO CARDS */}
        <Grid container spacing={2} mb={4}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <InfoCard
              icon={<LocationOnIcon />}
              title='الموقع'
              value={project.location}
              bg='#e8f5e9'
              color='#457461'
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <InfoCard
              icon={<CategoryIcon />}
              title='القطاع'
              value={project.category}
              bg='#e3f2fd'
              color='#1565c0'
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <InfoCard
              icon={<BusinessIcon />}
              title='الجهة المنفذة'
              value={project.executor}
              bg='#fff3e0'
              color='#ef6c00'
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <InfoCard
              icon={<AccountBalanceIcon />}
              title='الجهة الممولة'
              value={project.funder}
              bg='#fce4ec'
              color='#c2185b'
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <InfoCard
              icon={<AttachMoneyIcon />}
              title='الكلفة'
              value={`$${project.price}`}
              bg='#e8f5e9'
              color='#2e7d32'
            />
          </Grid>

          {/* Progress */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: '#f8fafb',
                height: '100%',
                boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: '#e3f2fd',
                    color: '#1565c0',
                  }}
                >
                  <CalendarMonthIcon />
                </Avatar>

                <Box sx={{ width: '100%' }}>
                  <Typography variant='caption'>نسبة الإنجاز</Typography>

                  <Typography fontWeight={700}>{project.progress}%</Typography>

                  <LinearProgress
                    variant='determinate'
                    value={project.progress}
                    sx={{
                      mt: 1,
                      height: 8,
                      borderRadius: 5,
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* REQUIREMENTS + BILL */}
        <Grid container spacing={3}>
          {/* REQUIREMENTS */}
          <Grid size={6}>
            <Card
              sx={{
                p: 4,
                borderRadius: 5,
                boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
                height: '100%',
              }}
            >
              <Typography variant='h5' fontWeight={800} mb={3}>
                متطلبات المشروع
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {project.requirements?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start',
                      bgcolor: '#f8fafb',
                      py: 1.5,
                      borderRadius: 4,
                      border: '1px solid #edf0f4',
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: '#6B9E8A',
                        mt: 0.2,
                      }}
                    />

                    <Typography lineHeight={1.8}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* BILL */}
          <Grid size={6}>
            <Card
              sx={{
                p: 4,
                borderRadius: 5,
                boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
                height: '100%',
              }}
            >
              <Typography variant='h5' fontWeight={800} mb={3}>
                التفاصيل
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {billItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      bgcolor: '#f8fafb',
                      py: 1.5,
                      gap: 1.5,
                      borderRadius: 4,
                      border: '1px solid #edf0f4',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 200,
                      }}
                    >
                      {/* DELETE BUTTON */}
                      <IconButton
                        size='small'
                        onClick={() => handleDelete(index)}
                        sx={{
                          color: '#d32f2f',
                        }}
                      >
                        <CloseIcon fontSize='small' />
                      </IconButton>

                      <Typography fontSize={15}>{item.name}</Typography>
                    </Box>

                    {/* PRICE */}
                    <Typography fontWeight={700} color='#2e7d32'>
                      ${item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* TOTAL */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#eaf6ef',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography fontWeight={800}>المجموع</Typography>

                <Typography fontWeight={900} color='#2e7d32'>
                  $
                  {billItems
                    .reduce((sum, item) => sum + Number(item.price), 0)
                    .toFixed(2)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* GALLERY */}
        <Card
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 5,
            boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          }}
        >
          <Typography variant='h5' fontWeight={800} mb={4}>
            صور المشروع
          </Typography>

          <Grid container spacing={4}>
            {project.images?.map((img, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  component='img'
                  src={img}
                  alt={`project-${index}`}
                  onClick={() => setLightboxImg(img)}
                  sx={{
                    width: 350,
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
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>

      {/* LIGHTBOX */}
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
    </Box>
  );
}

/* INFO CARD */
function InfoCard({ icon, title, value, bg, color }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        bgcolor: '#f8fafb',
        height: '100%',
        boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
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
            bgcolor: bg,
            color: color,
          }}
        >
          {icon}
        </Avatar>

        <Box>
          <Typography variant='caption'>{title}</Typography>

          <Typography fontWeight={700}>{value}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
