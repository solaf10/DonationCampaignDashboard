import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SuccessMessageDialog from './SuccessMessageDialog';
import DeleteItemLogic from './DeleteItemLogic';
import { useDispatch, useSelector } from 'react-redux';
import {
  controlAddProjectDetailModalOpen,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import config from '../constants/enviroment';
import { AddRounded } from '@mui/icons-material';
import useAddProjectDetail from '../customHooks/mutations/useAddProjectDetail';
import AddProjectDetailModal from './AddProjectDetailModal';

const ProjectsBill = ({ details, projectID }) => {
  const dispatch = useDispatch();
  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );

  const deletedItemUrl = `/${config.projects.details.delete}/${deletedItemID}`;

  return (
    <>
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
              التفاصيل
            </Typography>
            <button
              style={{ backgroundColor: 'var(--secondary-color)' }}
              onClick={() => dispatch(controlAddProjectDetailModalOpen())}
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
            }}
          >
            {details?.map((item) => (
              <Box
                key={item.uuid}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: '#f8fafb',
                  py: 1.5,
                  gap: 1.5,
                  borderRadius: 4,
                  borderBottom: '1px solid #edf0f4',
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
                    sx={{
                      color: '#d32f2f',
                    }}
                    onClick={() =>
                      dispatch(
                        controlSuccessDialog(`${projectID}/${item.uuid}`),
                      )
                    }
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>

                  <Typography fontSize={15}>{item.detail}</Typography>
                </Box>

                {/* PRICE */}
                <Typography fontWeight={700} color='#2e7d32'>
                  ${item.cost}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* TOTAL */}
          {details?.length > 0 && (
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
                {details
                  ?.reduce((sum, item) => sum + parseInt(item.cost), 0)
                  .toFixed(2)}
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>
      <DeleteItemLogic
        deletedItemTitle='العنصر'
        baseQuery={['projects', projectID]}
        url={deletedItemUrl}
      />
      <AddProjectDetailModal projectID={projectID} />
    </>
  );
};

export default ProjectsBill;
