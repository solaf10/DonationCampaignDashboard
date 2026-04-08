import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
} from '@mui/material';
import StepperIcon from './StepperIcon';
import './StepperForm.css';
import CustomInput from '../locations/CustomInput';
import { useActiveStep } from '../../contexts/ActiveStepContext';

const steps = [
  'المعلومات الأساسية',
  'الجدولة الزمنية للحملة',
  'التمويل المستهدف',
  'المشاريع المرتبطة',
];

export default function StepperForm({ icons, submitBtnTitle, children }) {
  const { activeStep, setActiveStep } = useActiveStep();

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(12);
  };

  return (
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
          minHeight: '100%',
          backgroundColor: '#fff',
          borderRadius: '14px',
          padding: 3,
          boxShadow: '0 4px 12px rgba(1,74,91,0.08)',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            height: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {children}

          <Box sx={{ display: 'flex', gap: 1, marginTop: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                color: '#4B4B4B',
              }}
            >
              رجوع
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant='contained'
                asChild
                sx={{
                  backgroundColor: 'var(--main-color)',
                  borderRadius: '99px',
                }}
              >
                <input
                  type='submit'
                  value={submitBtnTitle}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: 'inherit',
                    color: 'inherit',
                  }}
                />
              </Button>
            ) : (
              <Button
                variant='contained'
                onClick={handleNext}
                sx={{
                  backgroundColor: 'var(--main-color)',
                  borderRadius: '99px',
                }}
              >
                التالي
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
