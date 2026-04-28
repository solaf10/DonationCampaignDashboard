// import {
//   CalendarMonthOutlined,
//   FactCheckOutlined,
//   FolderOutlined,
//   RequestQuoteOutlined,
// } from "@mui/icons-material";
// import { useActiveStep } from "../../contexts/ActiveStepContext";
// import StepperForm from "../Stepper/StepperForm";
// import { useRef, useState } from "react";
// import CustomInput from "../locations/CustomInput";
// import Textarea from "../Textarea";
// import { Grid, Typography } from "@mui/material";
// import "../CampaignsForm.css";
// import AddModal from "../AddModal";
// import "../campaignsForm.css";

// imple

// const ProjectForm = () => {
//   const { activeStep } = useActiveStep();

//   // الحقول الأصلية
//   const [name, setName] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [selectedImage, setSelectedImage] = useState("");

//   // ✅ الحقول الجديدة - كل وحدة state لحالها
//   const [sector, setSector] = useState("");
//   const [region, setRegion] = useState("");
//   const [estimatedCost, setEstimatedCost] = useState("");
//   const [completionRate, setCompletionRate] = useState("");

//   const icons = {
//     1: <FolderOutlined fontSize="small" />,
//     2: <CalendarMonthOutlined fontSize="small" />,
//     3: <RequestQuoteOutlined fontSize="small" />,
//     4: <FactCheckOutlined fontSize="small" />,
//   };

//   const styles = {
//     marginBottom: "24px",
//   };
//   const HorizontalInput2 = ({ label, value, setValue, placeholder }) => (
//     <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//       <div style={{ width: "40%", textAlign: "right", fontFamily: "Cairo" }}>
//         {label}
//       </div>

//       <div style={{ width: "60%" }}>
//         <CustomInput
//           inputType="input"
//           placeholder={placeholder}
//           value={value}
//           setValue={setValue}
//         />
//       </div>
//     </div>
//   );
//   // first step content
//   const infoForm = (
//     <div className="form-holder">
//       <HorizontalInput
//         label="اسم المشروع"
//         inputType="input"
//         placeholder="اسم المشروع"
//         value={name}
//         setValue={setName}
//         styles={styles}
//       />

//       {/* ✅ سطر 1: القطاع + المنطقة */}
//       <Grid container spacing={3} sx={{ mb: "24px" }}>
//         <Grid item xs={6}>
//           <HorizontalInput2
//             label="القطاع"
//             inputType="input"
//             placeholder="القطاع"
//             value={sector}
//             setValue={setSector}
//             inline
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <HorizontalInput2
//             label="المنطقة"
//             inputType="input"
//             placeholder="المنطقة"
//             value={region}
//             setValue={setRegion}
//             inline
//           />
//         </Grid>
//       </Grid>

//       {/* ✅ سطر 2: الكلفة المقدرة + نسبة الانجاز */}
//       <Grid container spacing={3} sx={{ mb: "24px" }}>
//         <Grid item xs={6}>
//           <HorizontalInput2
//             label="الكلفة المقدرة"
//             inputType="input"
//             placeholder="0"
//             value={estimatedCost}
//             setValue={(val) => {
//               if (!isNaN(val)) setEstimatedCost(val);
//             }}
//             inline
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <HorizontalInput2
//             label="نسبة الانجاز"
//             inputType="input"
//             placeholder="0 - 100"
//             value={completionRate}
//             setValue={(val) => {
//               if (!isNaN(val) && Number(val) <= 100) setCompletionRate(val);
//             }}
//             inline
//           />
//         </Grid>
//       </Grid>

//       <HorizontalInput
//         label="الجهات الممولة"
//         inputType="input"
//         placeholder="الجهات الممولة"
//         value={name}
//         setValue={setName}
//         styles={styles}
//       />
//       <HorizontalInput
//         label="الجهة المنفذة"
//         inputType="input"
//         placeholder="الجهة المنفذة"
//         value={name}
//         setValue={setName}
//         styles={styles}
//       />
//     </div>
//   );

//   // second step content
//   const timingForm = (
//     <Grid container spacing={2}>
//       <Textarea
//         label="أضف متطلبات المشروع"
//         placeholder="ادخل متطلبات ولوازم المشروع"
//         value={purpose}
//         setValue={setPurpose}
//         inputType="textarea"
//       />
//     </Grid>
//   );

//   // last step content
//   // const [targetFunding, setTargetFunding] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [extraImages, setExtraImages] = useState([]);
//   const [videoUrl, setVideoUrl] = useState("");
//   const extraInputRef = useRef(null);

//   const paymentForm = (
//     <div className="form-holder">
//       {/* 1. صورة الغلاف */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "flex-start",
//           gap: "24px",
//           marginBottom: "24px",
//           direction: "rtl",
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "Cairo",
//             fontSize: "16px",
//             color: "#374151",
//             whiteSpace: "nowrap",
//             mt: 1,
//           }}
//         >
//           ادخل صورة غلاف للمشروع
//         </Typography>

//         <div className="product-image" style={{ padding: "16.5px 14px" }}>
//           <label
//             htmlFor="upload"
//             className={selectedImage != "" ? "image-selected" : ""}
//           >
//             {selectedImage != "" ? (
//               <img src={selectedImage} alt="campaign's cover image" />
//             ) : (
//               <svg
//                 stroke="currentColor"
//                 fill="currentColor"
//                 strokeWidth="0"
//                 viewBox="0 0 512 512"
//                 class="icon"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="icon"
//               >
//                 <path
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="32"
//                   d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
//                 ></path>
//                 <path
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="32"
//                   d="m320 255.79-64-64-64 64m64 192.42V207.79"
//                 ></path>
//               </svg>
//             )}
//             <span>
//               {selectedImage != "" ? "" : "اسحب الصورة هنا أو اضغط للرفع"}
//             </span>
//           </label>
//           <input
//             className="upload-input"
//             id="upload"
//             type="file"
//             onChange={(e) => {
//               setSelectedImage(URL.createObjectURL(e?.target?.files?.[0]));
//             }}
//           />
//         </div>
//         <input
//           id="cover-upload"
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
//         />
//       </div>

//       {/* 2. صور إضافية */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "flex-start",
//           gap: "24px",
//           marginBottom: "24px",
//           direction: "rtl",
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "Cairo",
//             fontSize: "16px",
//             color: "#374151",
//             whiteSpace: "nowrap",
//             mt: 1,
//           }}
//         >
//           صور إضافية للمشروع
//         </Typography>

//         <div
//           style={{ flex: 1, display: "flex", gap: "10px", flexWrap: "wrap" }}
//         >
//           {/* الصور المختارة */}
//           {extraImages.map((img, index) => (
//             <div
//               key={index}
//               style={{
//                 width: "72px",
//                 height: "72px",
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 position: "relative",
//               }}
//             >
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt={`extra-${index}`}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//               <div
//                 onClick={() =>
//                   setExtraImages((prev) => prev.filter((_, i) => i !== index))
//                 }
//                 style={{
//                   position: "absolute",
//                   top: "2px",
//                   left: "2px",
//                   background: "#fff",
//                   borderRadius: "50%",
//                   width: "18px",
//                   height: "18px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   fontSize: "12px",
//                   color: "#666",
//                   boxShadow: "0 1px 3px #0003",
//                 }}
//               >
//                 ×
//               </div>
//             </div>
//           ))}

//           {/* زر إضافة صورة */}
//           <div
//             onClick={() => extraInputRef.current?.click()}
//             style={{
//               width: "72px",
//               height: "72px",
//               border: "1px solid #e0e0e0",
//               borderRadius: "8px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               gap: "4px",
//               color: "#9AA0A6",
//               backgroundColor: "#fafafa",
//             }}
//           >
//             <span style={{ fontSize: "22px", lineHeight: 1 }}>+</span>
//             <Typography
//               sx={{ fontFamily: "Cairo", fontSize: "11px", color: "#9AA0A6" }}
//             >
//               إضافة صور
//             </Typography>
//           </div>
//           <input
//             ref={extraInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             style={{ display: "none" }}
//             onChange={(e) => {
//               const files = Array.from(e.target.files || []);
//               setExtraImages((prev) => [...prev, ...files]);
//             }}
//           />
//         </div>
//       </div>

//       {/* 3. فيديو توضيحي */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "24px",
//           direction: "rtl",
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "Cairo",
//             fontSize: "16px",
//             color: "#374151",
//             whiteSpace: "nowrap",
//           }}
//         >
//           فيديو توضيحي
//         </Typography>
//         <CustomInput
//           label=""
//           inputType="input"
//           placeholder="https://youtube.com/.."
//           value={videoUrl}
//           setValue={setVideoUrl}
//           styles={{ flex: 1, marginBottom: 0 }}
//         />
//       </div>
//     </div>
//   );
//   return (
//     <>
//       <StepperForm icons={icons} submitBtnTitle="إضافة المشروع" steps={steps}>
//         {activeStep === 0
//           ? infoForm
//           : activeStep === 1
//             ? timingForm
//             : paymentForm}
//       </StepperForm>
//       <AddModal />
//     </>
//   );
// };

// export default ProjectForm;import {
import {
  CalendarMonthOutlined,
  FactCheckOutlined,
  FolderOutlined,
  RequestQuoteOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from './Stepper/StepperForm';
import { useState, useRef } from 'react';
import CustomInput from './locations/CustomInput';
import Textarea from './Textarea';
import { Grid, Typography } from '@mui/material';
import './CampaignsForm.css';
import AddModal from './AddBySelectionModal';
import { Navigate } from 'react-router-dom';

const steps = ['المعلومات الأساسية', 'التفاصيل والمتطلبات ', ' الوسائط'];
const ProjectForm = () => {
  const navigate = useNavigate();
  const { activeStep } = useActiveStep();
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');

  // second step ✅
  const [region, setRegion] = useState('');
  const [sector, setSector] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [completionRate, setCompletionRate] = useState('');
  const [fundingParties, setFundingParties] = useState('');
  const [implementingParty, setImplementingParty] = useState('');
  // third step
  // third step
  //   const [coverImage, setCoverImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const extraInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState('');

  const icons = {
    1: <FolderOutlined fontSize='small' />,
    2: <CalendarMonthOutlined fontSize='small' />,
    3: <RequestQuoteOutlined fontSize='small' />,
    4: <FactCheckOutlined fontSize='small' />,
  };

  const styles = { marginBottom: '24px' };
  const HorizontalInput = ({ label, value, setValue, placeholder }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div
        style={{ width: 'fitcontent', textAlign: 'right', fontFamily: 'Cairo' }}
      >
        {label}
      </div>

      <div style={{ width: '75%' }}>
        <CustomInput
          inputType='input'
          placeholder={placeholder}
          value={value}
          setValue={setValue}
        />
      </div>
    </div>
  );

  // first step
  const infoForm = (
    <div className='form-holder'>
      <CustomInput
        label='اسم المشروع'
        inputType='input'
        placeholder='اسم المشروع'
        value={name}
        setValue={setName}
        styles={styles}
      />
      <Textarea
        label='أهداف المشروع'
        placeholder='اكتب أهداف المشروع باختصار...'
        value={purpose}
        setValue={setPurpose}
        inputType='textarea'
      />
    </div>
  );

  // second step ✅
  const infomForm = (
    <div className='form-holder'>
      <CustomInput
        label='الجهات الممولة'
        inputType='input'
        placeholder='الجهات الممولة'
        value={fundingParties}
        setValue={setFundingParties}
        styles={styles}
      />
      <CustomInput
        label='الجهة المنفذة'
        inputType='input'
        placeholder='الجهة المنفذة'
        value={implementingParty}
        setValue={setImplementingParty}
        styles={styles}
      />
      <Grid container spacing={3}>
        <Grid size={6}>
          <CustomInput
            label='المنطقة'
            inputType='input'
            placeholder='المنطقة'
            value={region}
            setValue={setRegion}
            inline
          />
        </Grid>
        <Grid size={6}>
          <CustomInput
            label='القطاع'
            inputType='input'
            placeholder='القطاع'
            value={sector}
            setValue={setSector}
            inline
          />
        </Grid>
        <Grid size={6}>
          <CustomInput
            label='الكلفة المقدرة'
            inputType='input'
            placeholder='$'
            value={estimatedCost}
            setValue={(val) => {
              if (!isNaN(val)) setEstimatedCost(val);
            }}
            inline
          />
        </Grid>
        <Grid size={6}>
          <CustomInput
            label='نسبة الانجاز'
            inputType='input'
            placeholder='ضع نسبة تتراوح بين 0 - 100'
            value={completionRate}
            setValue={(val) => {
              if (!isNaN(val) && Number(val) <= 100) setCompletionRate(val);
            }}
            inline
          />
        </Grid>
      </Grid>
    </div>
  );

  // last step
  const paymentForm = (
    <div className='form-holder'>
      <div className='image-upload' style={{ marginTop: '24px' }}>
        {/* 1. صورة الغلاف */}
        <div style={{ display: 'flex', gap: '20px', margin: '0 0  20px 0 ' }}>
          <Typography
            sx={{
              mb: 1,
              fontFamily: 'Cairo',
              fontSize: '16px',
              color: '#374151',
            }}
          >
            صورة غلاف المشروع
          </Typography>
          <div className='product-image' style={{ padding: '16.5px 14px' }}>
            <label
              htmlFor='upload'
              className={selectedImage != '' ? 'image-selected' : ''}
            >
              {selectedImage != '' ? (
                <img src={selectedImage} alt="campaign's cover image" />
              ) : (
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 512 512'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon'
                >
                  <path
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='32'
                    d='M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56'
                  />
                  <path
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='32'
                    d='m320 255.79-64-64-64 64m64 192.42V207.79'
                  />
                </svg>
              )}
              <span>
                {selectedImage != '' ? '' : 'اسحب الصورة هنا أو اضغط للرفع'}
              </span>
            </label>
            <input
              className='upload-input'
              id='upload'
              type='file'
              onChange={(e) => {
                setSelectedImage(URL.createObjectURL(e?.target?.files?.[0]));
              }}
            />
          </div>
        </div>
        <div className='form-holder'>
          {/* 2. صور إضافية */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '24px',
              direction: 'rtl',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Cairo',
                fontSize: '16px',
                color: '#374151',
                whiteSpace: 'nowrap',
                mt: 1,
              }}
            >
              صور إضافية للمشروع
            </Typography>

            <div
              style={{
                mb: 1,
                fontFamily: 'Cairo',
                fontSize: '16px',

                color: ' rgb(55, 65, 81)',
                height: '70px',
                cursor: 'pointer',
                border: '2px dashed #ccc',
                borderRadius: '8px',
                transition: ' 0.5s',
                width: '70px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* الصور المختارة */}
              {extraImages.map((img, index) => (
                <div key={index} style={{ width: '100% ', height: '100%' }}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`extra-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    onClick={() =>
                      setExtraImages((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    // style={{
                    //   position: "absolute",
                    //   top: "2px",
                    //   left: "2px",
                    //   background: "#fff",
                    //   borderRadius: "50%",
                    //   width: "18px",
                    //   height: "18px",
                    //   display: "flex",
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    //   cursor: "pointer",
                    //   fontSize: "12px",
                    //   color: "#666",
                    //   boxShadow: "0 1px 3px #0003",
                    // }}
                  >
                    ×
                  </div>
                </div>
              ))}

              {/* زر إضافة صورة */}
              <div
                onClick={() => extraInputRef.current?.click()}
                style={{
                  display: 'flex',
                  margin: '5px 0 0 0',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  gap: '10px',
                  color: ' rgb(154, 160, 166)',
                }}
              >
                <span style={{ fontSize: '22px', lineHeight: 1 }}>+</span>
                <Typography
                  sx={{
                    fontFamily: 'Cairo',
                    fontSize: '11px',
                    color: '#9AA0A6',
                  }}
                >
                  إضافة صور
                </Typography>
              </div>
              <input
                ref={extraInputRef}
                type='file'
                accept='image/*'
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setExtraImages((prev) => [...prev, ...files]);
                }}
              />
            </div>
          </div>

          {/* 3. فيديو توضيحي */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              direction: 'rtl',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Cairo',
                fontSize: '16px',
                color: '#374151',
                whiteSpace: 'nowrap',
              }}
            >
              فيديو توضيحي
            </Typography>

            <CustomInput
              label=''
              inputType='url'
              placeholder='https://youtube.com/..'
              value={videoUrl}
              setValue={setVideoUrl}
              styles={styles}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StepperForm
      icons={icons}
      submitBtnTitle='إضافة المشروع'
      steps={steps}
      successTitle='تم إنشاء المشروع بنجاح!'
      successMessage='تم حفظ المشروع بنجاح'
      successPrimaryText='إضافة حملة للمشروع'
      successNavigate='/content/projects'
      onSuccessPrimaryAction={() => navigate('/content/projects')}
    >
      {activeStep === 0 ? infoForm : activeStep === 1 ? infomForm : paymentForm}
    </StepperForm>
  );
};

export default ProjectForm;
