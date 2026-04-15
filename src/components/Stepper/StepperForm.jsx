import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
} from "@mui/material";
import StepperIcon from "./StepperIcon";
import "./StepperForm.css";
import CustomInput from "../locations/CustomInput";
import { useActiveStep } from "../../contexts/ActiveStepContext";
import { useState } from "react";
import SuccessMessageDialog from "../SuccessMessageDialog";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddModal from "../AddModal";
// import { controlAddModal } from "../../redux/slices/ModalContollerSlice";
export default function StepperForm({
  icons,
  submitBtnTitle,
  steps,
  children,
}) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAddProjectsOpen, setIsAddProjectsOpen] = useState(false);
  const { activeStep, setActiveStep } = useActiveStep();
  const projects = [];
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccessOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "14px",
            padding: 3,
            boxShadow: "0 4px 12px rgba(1,74,91,0.08)",
          }}
        >
          {/* 🔹 الستيبر (يمين) */}
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              minWidth: "200px",
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
                    "& .MuiStepLabel-label": {
                      fontFamily: "Cairo",
                      fontSize: "14px",
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
            height: "425px",
            backgroundColor: "#fff",
            borderRadius: "14px",
            padding: 3,
            boxShadow: "0 4px 12px rgba(1,74,91,0.08)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {children}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                pt: 2,
                borderTop: "1px solid #e1eaea",
              }}
            >
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  asChild
                  sx={{
                    backgroundColor: "#014a5b",
                    borderRadius: "8px",
                    padding: "8px 24px",
                    cursor: "pointer",
                  }}
                  className="btn"
                >
                  <input
                    type="submit"
                    value={submitBtnTitle}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "inherit",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    backgroundColor: "#014a5b",
                    borderRadius: "8px",
                    padding: "8px 24px",
                  }}
                  className="btn"
                >
                  التالي
                </Button>
              )}
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  borderRadius: "8px",
                  padding: "8px 24px",
                  border: "none",
                  color: "#8c9ea0",
                }}
              >
                رجوع
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      {isSuccessOpen && (
        // <SuccessMessageDialog
        //   isOpen={isSuccessMessageDialogOpen}
        //   setIsOpen={setIsSuccessMessageDialogOpen}
        // />
        <SuccessMessageDialog
          isOpen={isSuccessOpen}
          Add={isAddProjectsOpen}
          setIsOpen={setIsSuccessOpen}
          title="تم إنشاء الحملة بنجاح!"
          message="يمكنك الآن إضافة مشاريع مرتبطة أو المتابعة لاحقًا"
          primaryButtonText="إضافة مشاريع الآن"
          onPrimaryAction={() => {
            setIsSuccessOpen(false);
            setIsAddProjectsOpen(true); // 🔥 هون الربط الحقيقي
          }}
          navigateAfterClose="/content/campaigns"
          navigate={navigate}
        />
      )}
      <AddModal
        isOpen={isAddProjectsOpen}
        onClose={() => setIsAddProjectsOpen(false)}
        projects={projects}
        onSubmit={(selected) => {
          console.log(selected);
          setIsAddProjectsOpen(false);
        }}
      />
    </>
  );
}
