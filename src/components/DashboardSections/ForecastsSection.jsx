import { useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

const THEME = {
  primary: "#014a5b",
  primaryLight: "#026b7d",
  bg: "#f6f8fb",
  card: "#ffffff",
  border: "#e6edf2",
  textPrimary: "#333",
  textMuted: "#64748b",
  success: "#2e7d32",
  warning: "#ed6c02",
  danger: "#d14343",
};

const RISK_MAP = {
  High: { color: "#d14343", bg: "#fff5f5", label: "مرتفع" },
  Medium: { color: "#ed6c02", bg: "#fff8ed", label: "متوسط" },
  Low: { color: "#2e7d32", bg: "#f1fbf3", label: "منخفض" },
  default: { color: "#64748b", bg: "#f8fafc", label: "غير معروف" },
};

const formatNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));

/* ================= HEADER ================= */
const SectionHeader = ({ icon, title, count }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={0.5}
    sx={{
      mb: 2,
      px: 0.5,
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: 2,
        bgcolor: `${THEME.primary}10`,
        display: "flex",
        color: THEME.primary,
        "& svg": {
          // fontSize: 20, 
        },
      }}
    >
      {icon}
    </Box>

    <Typography fontWeight={800} fontSize={18} color={THEME.textPrimary}>
      {title}
    </Typography>

    <Chip
      label={count}
      size="small"
      sx={{
        bgcolor: "#f1f5f9",
        fontWeight: 700,
        color: THEME.textMuted,
      }}
    />
  </Stack>
);

/* ================= MAIN ================= */
const ForecastsSection = ({ data }) => {
  const forecasts = data?.forecasts || {};

  const projectRisks = forecasts?.project_risks || [];
  const priorityProjects = forecasts?.priority_projects || [];
  const timeDelayRisks = forecasts?.time_delay_risks || [];
  const mostDelayedProjects = data?.charts?.most_delayed_projects || [];

  const mergedProjects = useMemo(() => {
    const map = new Map();

    const upsert = (p, extra = {}) =>
      map.set(p.project, { ...map.get(p.project), ...p, ...extra });

    projectRisks.forEach((p) => upsert(p));
    mostDelayedProjects.forEach((p) => upsert(p));
    priorityProjects.forEach((p) => upsert(p, { isPriority: true }));

    return Array.from(map.values()).sort(
      (a, b) => (b.delay_percentage ?? 0) - (a.delay_percentage ?? 0)
    );
  }, [projectRisks, mostDelayedProjects, priorityProjects]);

  const highRiskCount = mergedProjects.filter(
    (p) => p.risk === "High"
  ).length;

  return (
    <Box sx={{ bgcolor: THEME.bg, minHeight: "100vh" }}>

      {/* ================= HERO (Improved) ================= */}
    {/* ================= HERO PREMIUM ================= */}
<Paper
  elevation={0}
  sx={{
    p: 3,
    borderRadius: 6,
    position: "relative",
    overflow: "hidden",
    background: `
      linear-gradient(
      135deg,
      #013A47 0%,
      #014A5B 45%,
      #026B7D 100%
      )
    `,
    color: "#fff",
    boxShadow: "0 20px 50px rgba(1,74,91,.20)",
  }}
>
  {/* Decorative Shapes */}
  <Box
    sx={{
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: "50%",
      top: -120,
      insetInlineEnd: -80,
      bgcolor: "rgba(255,255,255,.05)",
    }}
  />

  <Box
    sx={{
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: "50%",
      bottom: -180,
      insetInlineStart: -100,
      bgcolor: "rgba(255,255,255,.04)",
    }}
  />

  <Grid
    container
    spacing={5}
    alignItems="center"
    sx={{ position: "relative", zIndex: 2 }}
  >
    <Grid item xs={12} md={7}>
      <Typography
        fontWeight={900}
        sx={{
          fontSize: {
            xs: 28,
            md: 38,
          },
        }}
      >
        مركز التنبؤات والتحليلات الذكية
      </Typography>

      <Typography
        sx={{
          mt: 1.5,
          opacity: 0.9,
          maxWidth: { xs: "100%", md: 420 },
          lineHeight: 1.9,
          fontSize: 15,
        }}
      >
        متابعة المخاطر والتأخيرات والفجوات التمويلية
        باستخدام مؤشرات تحليلية متقدمة
        وتوقعات مستقبلية تساعد في اتخاذ القرار.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{ mt: 3 }}
      >
        <Chip
          label={`${highRiskCount} مشاريع حرجة`}
          sx={{
            bgcolor: "rgba(255,255,255,.12)",
            color: "#fff",
            fontWeight: 700,
          }}
        />

        <Chip
          label={`${mergedProjects.length} مشروع`}
          sx={{
            bgcolor: "rgba(255,255,255,.12)",
            color: "#fff",
            fontWeight: 700,
          }}
        />
      </Stack>
    </Grid>

    <Grid item xs={12} md={5} alignItems="center" justifyContent="center"> 
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {[
          {
            title: "فجوة التمويل",
            value: `$${formatNumber(forecasts?.funding_gap)}`,
          },
          {
            title: "التبرعات المتوقعة",
            value: `$${formatNumber(
              forecasts?.donation_forecast?.next_month_forecast
            )}`,
          },
          {
            title: "المشاريع الحرجة",
            value: highRiskCount,
          },
          {
            title: "إجمالي المشاريع",
            value: mergedProjects.length,
          },
        ].map((item) => (
          <Grid item xs={6} sm={6} key={item.title} sx={{ minWidth: 0 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                height: "100%",
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,.08)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minWidth: 0,
                color: "#333",
              }}
            >
              <Typography
                sx={{
                  opacity: 0.8,
                  fontSize: 12,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                fontWeight={900}
                sx={{
                  mt: 1,
                  fontSize: { xs: 22, md: 28 },
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
</Paper>



      {/* ================= TIME ================= */}
      <Paper sx={{ p: 3, borderRadius: 4, mt: 3 }}>
        <SectionHeader
          icon={<ScheduleRoundedIcon />}
          title="التوقعات الزمنية"
          count={timeDelayRisks.length}
        />

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {timeDelayRisks.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.project}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: `1px solid ${THEME.border}`,
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Typography fontWeight={700} color={THEME.textPrimary}>
                  {item.project}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 13,
                    color: THEME.textMuted,
                  }}
                >
                  {item.gap_days != null
                    ? `تأخير ${item.gap_days} يوم`
                    : item.message}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* ================= TABLE (CLEANED COLORS) ================= */}
      <Paper sx={{ p: 2, borderRadius: 4, mt: 2 }}>
        <SectionHeader
          icon={<WarningAmberRoundedIcon />}
          title="المشاريع الأكثر تأخراً"
          count={mergedProjects.length}
        />

        <Divider />

        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["المشروع", "التأخير", "التكلفة", "المدفوع", "المتبقي", "الحالة"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#475569",
                        background: "#f8fafc",
                        borderBottom: "1px solid #e6edf2",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {mergedProjects.map((p, idx) => {
                const risk = RISK_MAP[p.risk] || RISK_MAP.default;

                return (
                  <tr
                    key={`${p.project}-${idx}`}
                    style={{
                      background: idx % 2 === 0 ? "#fff" : "#fafbfc",
                    }}
                  >
                    <td style={{ padding: "10px", fontWeight: 600 }}>
                      {p.project}
                    </td>

                    <td style={{ textAlign: "center", padding: "10px" }}>
                      <div style={{ fontWeight: 700, color: risk.color }}>
                        {p.delay_percentage || 0}%
                      </div>

                      <div
                        style={{
                          height: 5,
                          background: "#e5e7eb",
                          borderRadius: 999,
                          marginTop: 6,
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min(p.delay_percentage || 0, 100)}%`,
                            height: "100%",
                            background: risk.color,
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {formatNumber(p.estimated_cost)}
                    </td>

                    <td style={{ textAlign: "center", color: "#2e7d32", fontWeight: 700 }}>
                      {formatNumber(p.total_paid)}
                    </td>

                    <td style={{ textAlign: "center", color: THEME.primary, fontWeight: 700 }}>
                      {formatNumber(p.remaining_amount)}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <Chip
                        label={risk.label}
                        size="small"
                        sx={{
                          bgcolor: `${risk.color}12`,
                          color: risk.color,
                          fontWeight: 700,
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForecastsSection;