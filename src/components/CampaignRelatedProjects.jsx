import { AddRounded } from '@mui/icons-material';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { controlAddBySelectionModal } from '../redux/slices/ModalContollerSlice';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import MoreMenu from './MoreMenu';
import { toast } from 'react-toastify';
import config from '../constants/enviroment';
import useDelete from '../customHooks/mutations/useDelete';
import { useNavigate } from 'react-router-dom';

const CampaignRelatedProjects = ({ projects, campaignId }) => {
  const dispatch = useDispatch();

  const { mutate: deleteItem, isPending: isDeleting } = useDelete([
    'campaigns',
    campaignId,
  ]);

  const handleDeleteProject = (projectId) => {
    const url = `/${config.campaigns.deleteProject}/${campaignId}/${projectId}`;
    deleteItem(url, {
      onSuccess: () => {
        toast.success(`تم إزالة المشروع من الحملة بنجاح!`);
      },
      onError: (err) => {
        toast.error(err?.message || `حدث خطأ أثناء إزالة المشروع من الحملة!`);
      },
    });
  };
  const navigate = useNavigate();

  return (
    <Grid size={6}>
      <Card
        sx={{
          p: 4,
          borderRadius: 5,
          boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          mb={3}
        >
          <Typography variant='h5' fontWeight={800}>
            مشاريع الحملة
          </Typography>
          <button
            onClick={() => dispatch(controlAddBySelectionModal(campaignId))}
            style={{
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            <AddRounded />
          </button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '272px',
            overflowY: 'auto',
          }}
        >
          {projects?.length ? (
            projects.map((item) => (
              <Box
                onClick={() => navigate(`/content/projects/${item.uuid}`)}
                key={item.uuid}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: '#f8fafb',
                  py: 1.5,
                  px: 1,
                  gap: 1.5,
                  borderRadius: 4,
                  borderBottom: '1px solid #edf0f4',
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 200,
                  }}
                >
                  <IconButton
                    size='small'
                    style={{ marginLeft: '4px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(item.uuid);
                    }}
                    sx={{
                      color: '#d32f2f',
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>

                  <Typography fontSize={15}>{item.name}</Typography>
                </Box>

                <Typography sx={{ color: '#8a8a8a' }}>
                  📍 {item.district.city.governorate.governorate_name}
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pt: 3,
                pb: 6,
                textAlign: 'center',
                color: '#8c9ea0',
                height: '272px',
              }}
            >
              {/* icon placeholder */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: '#eef3f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  fontSize: 22,
                }}
              >
                📦
              </Box>

              <Typography fontWeight={600} mb={1}>
                لا يوجد مشاريع مرتبطة حالياً
              </Typography>

              <Typography fontSize={13} sx={{ opacity: 0.8 }}>
                يمكنك إضافة مشاريع إلى الحملة من خلال الزر بالأعلى
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default CampaignRelatedProjects;
