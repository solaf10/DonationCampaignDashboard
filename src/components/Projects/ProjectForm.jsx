import {
  CalendarMonthOutlined,
  FactCheckOutlined,
  FolderOutlined,
  RequestQuoteOutlined,
} from "@mui/icons-material";
import { useActiveStep } from "../../contexts/ActiveStepContext";
import StepperForm from "../Stepper/StepperForm";
import { useState } from "react";
import CustomInput from "../locations/CustomInput";
import Textarea from "../Textarea";
import { Grid, Typography } from "@mui/material";
import "../CampaignsForm.css";
import AddProjectsModal from "../AddModal";

const steps = [
  "المعلومات الأساسية",
  "التفاصيل والمتطلبات ",
  " الوسائط",
  "حملات التبرع",
];

const ProjectForm = () => {
  const { activeStep } = useActiveStep();
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  //   second step
  //   const [startDate, setStartDate] = useState(null);
  //   const [endDate, setEndDate] = useState(null);
  //   const [startTime, setStartTime] = useState(null);
  //   const [endTime, setEndTime] = useState(null);
  //   third step
  //   const [targetFunding, setTargetFunding] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const icons = {
    1: <FolderOutlined fontSize="small" />,
    2: <CalendarMonthOutlined fontSize="small" />,
    3: <RequestQuoteOutlined fontSize="small" />,
    4: <FactCheckOutlined fontSize="small" />,
  };
  // custom input custom styles
  const styles = {
    marginBottom: "24px",
  };

  // first step content
  const infoForm = (
    <div className="form-holder">
      <CustomInput
        label="اسم المشروع"
        inputType="input"
        placeholder="اسم المشروع"
        value={name}
        setValue={setName}
        styles={styles}
      />
      <CustomInput
        label=" الجهات الممولة"
        inputType="input"
        placeholder="الجهات الممولة"
        value={name}
        setValue={setName}
        styles={styles}
      />
      <CustomInput
        label="الجهة المنفذة"
        inputType="input"
        placeholder="الجهة المنفذة"
        value={name}
        setValue={setName}
        styles={styles}
      />
    </div>
  );

  // second step content
  const timingForm = (
    <Grid container spacing={2}>
      <Textarea
        label=" أضف متطلبات المشروع "
        placeholder="ادخل متطلبات ولوازم المشروع "
        value={purpose}
        setValue={setPurpose}
        inputType="textarea"
      />
    </Grid>
  );

  // last step content
  const paymentForm = (
    <div className="form-holder">
      {/* <CustomInput
        label="التمويل المستهدف (ل.س)"
        inputType="input"
        placeholder="مثال: 50,000,000"
        helperText="سيتم عرض المبلغ المجموع تلقائيًا بعد بدء الحملة"
        value={targetFunding}
        setValue={setTargetFunding}
        styles={{ ...styles, marginBottom: "8px" }}
      /> */}
      <div className="image-upload" style={{ marginTop: "24px" }}>
        <Typography
          sx={{
            mb: 1,
            fontFamily: "Cairo",
            fontSize: "16px",
            color: "#374151",
          }}
        >
          ادخل صورة غلاف للمشروع
        </Typography>
        <div className="product-image" style={{ padding: "16.5px 14px" }}>
          <label
            htmlFor="upload"
            className={selectedImage != "" ? "image-selected" : ""}
          >
            {selectedImage != "" ? (
              <img src={selectedImage} alt="campaign's cover image" />
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                class="icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="m320 255.79-64-64-64 64m64 192.42V207.79"
                ></path>
              </svg>
            )}
            <span>
              {selectedImage != "" ? "" : "اسحب الصورة هنا أو اضغط للرفع"}
            </span>
          </label>
          <input
            className="upload-input"
            id="upload"
            type="file"
            onChange={(e) => {
              setSelectedImage(URL.createObjectURL(e?.target?.files?.[0]));
            }}
          />
        </div>
      </div>
      <div className="images-upload" style={{ marginTop: "24px" }}>
        <Typography
          sx={{
            mb: 1,
            fontFamily: "Cairo",
            fontSize: "16px",
            color: "#374151",
          }}
        >
          صور إضافية للمشروع
        </Typography>
        <div className="product-image" style={{ padding: "16.5px 14px" }}>
          <label
            htmlFor="upload"
            className={selectedImage != "" ? "image-selected" : ""}
          >
            {selectedImage != "" ? (
              <img src={selectedImage} alt="campaign's cover image" />
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                class="icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="m320 255.79-64-64-64 64m64 192.42V207.79"
                ></path>
              </svg>
            )}
            <span>{selectedImage != "" ? "" : " اضافة صورة"}</span>
          </label>
          <input
            className="upload-input"
            id="upload"
            type="file"
            onChange={(e) => {
              setSelectedImage(URL.createObjectURL(e?.target?.files?.[0]));
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <StepperForm icons={icons} submitBtnTitle="إضافة المشروع" steps={steps}>
        {activeStep === 0
          ? infoForm
          : activeStep === 1
            ? timingForm
            : paymentForm}
      </StepperForm>
      {/* Projects Modal */}
      <AddProjectsModal />
    </>
  );
};

export default ProjectForm;
