import { useEffect, useState } from "react";
import { Box, Grid, MenuItem, Button } from "@mui/material";
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
export default function EditFinancialOperations() {
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

  // جلب بيانات السطر الحالي
  const { data: paymentData, isPending: isFetchingPayment } =
    usePaymentById(uuid);

  // جلب المشاريع والتفاصيل (للعرض فقط)
  const { data: projectData } = useProjects();
  const { data: detailsData } = useDetails(formData.project);
  console.log("paymentData =", paymentData);
  const { mutate: editPayment, isPending: isEditing } = useEditPayment();

  const projects = projectData?.data || [];
  const details = detailsData?.data || [];
  //   console.log("paymentData =", paymentData);
  // لما تجي البيانات، احشي الفورم
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

    editPayment(
      { uuid, payload },
      {
        onSuccess: () => navigate("/content/financial-operations"),
        onError: (error) => console.log("خطأ:", error),
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
                helperText={"لا يمكنك التعديل على التاريخ "}
              />
            </Grid>

            {/* الكلفة - بدون isDisabled */}
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
