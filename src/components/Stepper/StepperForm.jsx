import { useState } from 'react';
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

const steps = [
  'المعلومات الأساسية',
  'الجدولة الزمنية للحملة',
  'التمويل المستهدف',
  'المشاريع المرتبطة',
];

export default function StepperForm({ icons, submitBtnTitle }) {
  const [activeStep, setActiveStep] = useState(0);

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderRadius: '14px',
          padding: 3,
          boxShadow: '0 4px 12px rgba(1,74,91,0.08)',
        }}
      >
        <Typography mb={2}>محتوى الخطوة {activeStep + 1}</Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
