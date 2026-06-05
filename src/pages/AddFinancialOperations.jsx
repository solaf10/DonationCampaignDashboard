import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Fade,
  Select,
  FormControl,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/locations/CustomInput";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
export default function AddFinancialOperations({ onSubmit, onCancel }) {
  const styles = {
    marginBottom: "16px",
  };
  const [formData, setFormData] = useState({
    project: "",
    detail: "",
    pending_date: null,
    paid_amount: "",
  });
  const handleGovernmentChange = () =>
    // value

    {
      // setGovernment(value);
      // setCity("");
      // setError((prev) => ({
      //   ...prev,
      //   government: null,
      //   city: null,
      // }));
      // setFormError("");
    };
  // ─── Mock Data ────────────────────────────────────────────────────────────────

  // ─── Detail Info Row ──────────────────────────────────────────────────────────
  // function DetailRow({ label, value }) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         py: 0.8,
  //         borderBottom: "0.5px solid #b8e8d8",
  //         "&:last-child": { borderBottom: "none" },
  //       }}
  //     >
  //       <Typography sx={{ fontSize: 13, color: "#085041", fontWeight: 500 }}>
  //         {label}
  //       </Typography>
  //       <Typography sx={{ fontSize: 13, color: "#0F6E56" }}>{value}</Typography>
  //     </Box>
  //   );
  // }
  // const PROJECTS = [
  //   {
  //     id: "1",
  //     name: "مشروع البنية التحتية",
  //     sector: "إنشاءات",
  //     details: [
  //       { id: "d1", label: "دفعة أولى" },
  //       { id: "d2", label: "دفعة ثانية" },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "مشروع التطوير التقني",
  //     sector: "تقنية",
  //     details: [
  //       { id: "d3", label: "استشارات" },
  //       { id: "d4", label: "تطوير" },
  //     ],
  //   },
  // ];
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/pending/store", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  // ─── Main Form ────────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    project: "",
    detail: "",
    pendingDate: "",
    paidAmount: "",
  });

  const selectedProject = projects.find((p) => p.id === form.project) || null;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "project") {
      setForm({ project: value, detail: "", pendingDate: "", paidAmount: "" });
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
  };
  return (
    <div>
      <Link to={"/content/financial-operations"}>
        <PageContainer className={"title"}>
          {/* <div>
            <Typography
              fontWeight={700}
              lineHeight={1.8}
              className={"Toastify__toast-body"}
              // onClick={() => navigate(-1)}
              sx={{
                fontSize: "var(--main-title-font)",
                color: "var(--toastify-color-dark);",
                cursor: "pointer",
              }}
            >
              إضافة عملية مالية{" "}
            </Typography>
            <Typography
              lineHeight={1.8}
              className={"Toastify__toast-body"}
              // onClick={() => navigate(-1)}
              sx={{
                fontFamily: "-apple-system",
                fontSize: "var(--body-text)",
                color: " #7a7a7a",
                marginBottom: "24px",
              }}
            >
              يمكنك إضافة عملية دفع واحدة فقط للتفصيل خلال اليوم{" "}
            </Typography>
          </div> */}
          <Title
            pageTitle="إدارة العمليات المالية"
            subtitle="يمكنك اضافة عملية مالية واحدة للمشروع باليوم"
          ></Title>
          <Box
            sx={{
              flex: 1,
              height: "300px",
              backgroundColor: "#fff",
              borderRadius: "14px",
              padding: 3,
              boxShadow: "0 4px 12px rgba(1,74,91,0.08)",
            }}
          >
            {" "}
            <Grid container spacing={4}>
              <Grid size={6}>
                <CustomInput
                  styles={styles}
                  inputType="select"
                  label="اسم المشروع"
                  value={formData.project}
                  setValue={handleGovernmentChange}
                  // errorMsg={error.government}
                  InputProps={{
                    startAdornment: (
                      <FolderOpenIcon sx={{ color: "#aaa", fontSize: 18 }} />
                    ),
                  }}
                >
                  <MenuItem value="" disabled>
                    اختر المشروع...
                  </MenuItem>
                  {projects.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}

                  {/* {governments.map((government) => (
                  <MenuItem key={government.uuid} value={government.uuid}>
                  {government.governorate_name}
                  </MenuItem>
                  ))} */}
                </CustomInput>
              </Grid>
              <Grid size={6}>
                <CustomInput
                  inputType="select"
                  styles={styles}
                  label="التفاصيل"
                  value={formData.detail}
                  setValue={handleGovernmentChange}
                  // errorMsg={error.government}
                  disabled={!selectedProject}
                  helperText={!selectedProject ? "اختر المشروع أولاً" : ""}
                >
                  <MenuItem value="" disabled>
                    اختر التفاصيل...
                  </MenuItem>
                  {(selectedProject?.details || []).map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.label}
                    </MenuItem>
                  ))}
                  {/* {governments.map((government) => (
                  <MenuItem key={government.uuid} value={government.uuid}>
                  {government.governorate_name}
                  </MenuItem>
                  ))} */}
                </CustomInput>
              </Grid>
              <Grid size={6}>
                <CustomInput
                  label="تاريخ الدفع"
                  inputType="time"
                  placeholder="مثال: 00:00"
                  styles={styles}
                  value={formData.pending_date || null}
                  setValue={(newValue) =>
                    setFormData((prev) => ({
                      ...prev,
                      start_time: newValue,
                    }))
                  }
                  isNestedState={true}
                  // errorMsg={errors?.start_time || null}
                  isRequired={true}
                />
              </Grid>
              <div
                className="input-holder"
                // style={styles}
              >
                <CustomInput
                  label="الكلفة المقدرة"
                  styles={styles}
                  inputType="input"
                  placeholder="أدخل الكلفة التقديرية للمشروع"
                  value={formData.paid_amount || ""}
                  setValue={(e) => {
                    const value = e.target.value;

                    if (!isNaN(value)) {
                      setFormData((prev) => ({
                        ...prev,
                        paid_amount: value,
                      }));
                    }
                  }}
                  isNestedState={true}
                  // errorMsg={errors?.estimated_cost || null}
                  isRequired={true}
                />
              </div>
            </Grid>
            {/*   ── Header ──
              <Box sx={{ px: 4, pt: 3, pb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Title
                    pageTitle="إضافة مشروع جديد"
                    subtitle="أكمل الخطوات التالية لإضافة مشروع جديد"
                  />
                  <AttachMoneyIcon sx={{ color: "#0F6E56", fontSize: 22 }} />
                  <Title
                    sx={{ fontSize: 16, fontWeight: 700, color: "#0F6E56" }}
                  >
                    بيانات العملية المالية
                  </Title>
                </Box>
                <Typography sx={{ fontSize: 13, color: "#888", mr: 3.5 }}>
                  أكمل الحقول التالية لإضافة عملية مالية جديدة
                </Typography>
              </Box>

              <Divider />

              ── Form Fields ──
              <Box sx={{ px: 4, py: 3 }}>
                <Grid container spacing={2.5}>
                   Project Select
                  <Grid item xs={12} md={6}>
                    <CustomInput
                      inputType="select"
                      elect
                      // fullWidth
                      label="اسم المشروع"
                      value={form.project}
                      onChange={handleChange("project")}
                      required
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <FolderOpenIcon
                            sx={{ color: "#aaa", fontSize: 18 }}
                          />
                        ),
                      }}
                    >
                      <MenuItem value="" disabled>
                        اختر المشروع...
                      </MenuItem>
                      {PROJECTS.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name}
                        </MenuItem>
                      ))}
                    </CustomInput>
                  </Grid>

                   Detail Select
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="التفاصيل"
                      value={form.detail}
                      onChange={handleChange("detail")}
                      required
                      size="small"
                      disabled={!selectedProject}
                      helperText={!selectedProject ? "اختر المشروع أولاً" : ""}
                    >
                      <MenuItem value="" disabled>
                        اختر التفاصيل...
                      </MenuItem>
                      {(selectedProject?.details || []).map((d) => (
                        <MenuItem key={d.id} value={d.id}>
                          {d.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                   Project Detail Box
                  {selectedProject && (
                    <Grid item xs={12}>
                      <Fade in={!!selectedProject}>
                        {/* <Box
                          sx={{
                            background: "#E1F5EE",
                            borderRadius: 2,
                            px: 2.5,
                            py: 1.5,
                            border: "0.5px solid #9FE1CB",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#085041",
                              }}
                            >
                              تفاصيل المشروع
                            </Typography>
                            <Chip
                              label={selectedProject.sector}
                              size="small"
                              sx={{
                                background: "#0F6E56",
                                color: "#fff",
                                fontSize: 11,
                                height: 20,
                              }}
                            />
                          </Box>
                        </Box>
                      </Fade>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Divider sx={{ my: 0.5 }} />
                  </Grid>

                  {/* Pending Date
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="تاريخ الدفع"
                      type="date"
                      value={form.pendingDate}
                      onChange={handleChange("pendingDate")}
                      required
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* Paid Amount
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="المبلغ المدفوع"
                      type="number"
                      value={form.paidAmount}
                      onChange={handleChange("paidAmount")}
                      required
                      size="small"
                      inputProps={{ min: 0, step: "0.01" }}
                      InputProps={{
                        endAdornment: (
                          <Typography
                            sx={{ fontSize: 13, color: "#888", mr: 1 }}
                          >
                            $
                          </Typography>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              ── Actions ──
              <Divider />
              <Box
                sx={{
                  px: 4,
                  py: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  sx={{ borderColor: "#ccc", color: "#555", px: 3 }}
                >
                  إلغاء
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={
                    !form.project ||
                    !form.detail ||
                    !form.pendingDate ||
                    !form.paidAmount
                  }
                  sx={{
                    background: "#0F6E56",
                    "&:hover": { background: "#085041" },
                    px: 4,
                  }}
                >
                  حفظ العملية
                </Button>
              </Box>*/}
          </Box>
        </PageContainer>
      </Link>
    </div>
  );
}
