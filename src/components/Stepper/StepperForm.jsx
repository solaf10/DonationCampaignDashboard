import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';
import StepperIcon from './StepperIcon';
import './StepperForm.css';
import { useActiveStep } from '../../contexts/ActiveStepContext';
import { useDispatch } from 'react-redux';
import { controlSuccessDialog } from '../../redux/slices/ModalContollerSlice';

export default function StepperForm({
  icons,
  submitBtnTitle,
  steps,
  children,
}) {
  const { activeStep, setActiveStep } = useActiveStep();
  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(controlSuccessDialog());
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '14px',
            padding: 3,
            boxShadow: '0 4px 12px rgba(1,74,91,0.08)',
          }}
        >
          {/* 🔹 الستيبر (يمين) */}
          <Stepper
            activeStep={activeStep}
            orientation='vertical'
            sx={{
              minWidth: '200px',
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel
                  slots={{
                    stepIcon: (props) => (
                      <StepperIcon {...props} stepIcons={icons} />
                    ),
                  }}
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontFamily: 'Cairo',
                      fontSize: '14px',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* 🔹 الفورم (يسار) */}
        <Box
          sx={{
            flex: 1,
            height: '425px',
            backgroundColor: '#fff',
            borderRadius: '14px',
            padding: 3,
            boxShadow: '0 4px 12px rgba(1,74,91,0.08)',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {children}

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                pt: 2,
                borderTop: '1px solid #e1eaea',
              }}
            >
              <Button
                type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                onClick={
                  activeStep === steps.length - 1 ? undefined : handleNext
                }
                variant='contained'
                sx={{
                  backgroundColor: '#014a5b',
                  borderRadius: '8px',
                  padding: '8px 24px',
                }}
                className='btn'
              >
                {activeStep === steps.length - 1 ? submitBtnTitle : 'التالي'}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  borderRadius: '8px',
                  padding: '8px 24px',
                  border: 'none',
                  color: '#8c9ea0',
                }}
              >
                رجوع
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
