import { useEffect, useState } from "react";
import { Box, Grid, MenuItem, Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomInput from "../components/locations/CustomInput";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import {
  useDetails,
  useProjects,
  useEditPayment,
  usePaymentById,
} from "../customHooks/queries/usePayments";
import dayjs from "dayjs";

export default function Editf() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const styles = { marginBottom: "16px" };

  const [formData, setFormData] = useState({
    project: "",
    project_name: "",
    detail: "",
    detail_name: "",
    pending_date: null,
    paid_amount: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { data: paymentData, isPending: isFetchingPayment } =
    usePaymentById(uuid);

  const { data: projectData } = useProjects();
  const { data: detailsData } = useDetails(formData.project);

  const { mutate: editPayment, isPending: isEditing } = useEditPayment();

  const projects = projectData?.data || [];
  const details = detailsData?.data || [];

  useEffect(() => {
    if (paymentData?.data) {
      const item = paymentData.data;
      setFormData({
        project: item.project?.uuid || "",
        project_name: item.project?.name || "",
        detail: item.detail?.uuid || "",
        detail_name: item.detail?.detail || "",
        pending_date: item.pending_date ? dayjs(item.pending_date) : null,
        paid_amount: item.paid_amount || "",
      });
    }
  }, [paymentData]);

  const handleSubmit = () => {
    const payload = { paid_amount: formData.paid_amount };
    setErrorMsg("");

    editPayment(
      { uuid, payload },
      {
        onSuccess: () => navigate("/content/financial-operations"),
        onError: (error) => {
          const msg =
            error?.response?.data?.message ||
            " انتهت مدة الصلاحية على التعديل حاول غداً";
          setErrorMsg(msg);
        },
      },
    );
  };

  if (isFetchingPayment) return <p>جاري التحميل...</p>;

  return (
    <div>
      <PageContainer className={"title"}>
        <Link to={"/content/financial-operations"}>
          <Title pageTitle="تعديل عملية مالية" subtitle="" />
        </Link>
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "14px",
            padding: 3,
            boxShadow: "0 4px 12px rgba(1,74,91,0.08)",
          }}
        >
          <Grid container spacing={4}>
            {/* اسم المشروع */}
            <Grid size={6}>
              <CustomInput
                styles={styles}
                inputType="input"
                label="اسم المشروع"
                value={formData.project_name}
                setValue={() => {}}
                isDisabled={true}
                helperText={"لا يمكنك التعديل على اسم المشروع"}
              />
            </Grid>

            {/* التفاصيل */}
            <Grid size={6}>
              <CustomInput
                inputType="input"
                styles={styles}
                label="التفاصيل"
                value={formData.detail_name}
                setValue={() => {}}
                isDisabled={true}
                helperText={"لا يمكنك التعديل على اسم التفصيل"}
              />
            </Grid>

            {/* التاريخ */}
            <Grid size={6}>
              <CustomInput
                label="تاريخ الدفع"
                inputType="time"
                styles={styles}
                value={formData.pending_date}
                setValue={() => {}}
                isDisabled={true}
                helperText={"لا يمكنك التعديل على التاريخ"}
              />
            </Grid>

            {/* الكلفة - متاح للتعديل */}
            <Grid size={6}>
              <CustomInput
                label="الكلفة المقدرة"
                styles={styles}
                inputType="input"
                placeholder="أدخل الكلفة"
                value={formData.paid_amount || ""}
                setValue={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    setFormData((prev) => ({ ...prev, paid_amount: value }));
                  }
                }}
                isNestedState={true}
                isRequired={true}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              gap: 1,
            }}
          >
            {errorMsg && (
              <Typography
                sx={{
                  color: "var(--error-color)",
                  fontFamily: "Cairo",
                  fontSize: "14px",
                }}
              >
                {errorMsg}
              </Typography>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!formData.paid_amount || isEditing}
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "var(--main-color)",
                px: 4,
              }}
            >
              {isEditing ? "جاري الحفظ..." : "حفظ التعديل"}
            </Button>
          </Box>
        </Box>
      </PageContainer>
    </div>
  );
}
