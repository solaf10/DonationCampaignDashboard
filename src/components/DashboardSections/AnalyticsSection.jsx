import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
} from "@mui/material";

const cardBase = {
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
  overflow: "hidden",
};

const SectionHeader = ({ title, color }) => (
  <Box
    sx={{
      px: 2.5,
      py: 0.6, // ⬅️ reduced
      display: "flex",
      alignItems: "center",
      gap: 1,
      borderBottom: "1px solid #f1f5f9",
      background: "linear-gradient(to right, #f8fafc, #fff)",
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "3px",
        bgcolor: color,
      }}
    />
    <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>
      {title}
    </Typography>
  </Box>
);

const AccentCard = ({ children, color }) => (
  <Box
    sx={{
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "4px",
        backgroundColor: color,
      },
    }}
  >
    {children}
  </Box>
);

const ListItem = ({ text, index }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 1.2,
      px: 2,
      py: 0.8, 
      borderRadius: 2,
      bgcolor: "#f8fafc",
      border: "1px solid #eef2f7",
      fontSize: "13px",
      color: "#334155",
      lineHeight: 1.4,
      transition: "0.2s",
      "&:hover": {
        bgcolor: "#f1f5f9",
        transform: "translateX(2px)",
      },
    }}
  >
    {/* NUMBER BADGE */}
    <Box
      sx={{
        minWidth: 20,
        height: 20,
        borderRadius: "6px",
        bgcolor: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: 700,
        color: "#334155",
        mt: "1px",
        flexShrink: 0,
      }}
    >
      {index + 1}
    </Box>

    <Box sx={{ flex: 1 }}>{text}</Box>
  </Box>
);

const AnalyticsSection = ({ insights }) => {
  if (!insights) return null;

  return (
    <Grid container spacing={2}>
      {/* HERO SUMMARY */}
      <Grid item xs={12}>
        <AccentCard color="#014a5b">
          <Paper sx={cardBase}>
            <SectionHeader title="الملخص التنفيذي" color="#014a5b" />

            <Box sx={{ p: 2 }}> 
              <Typography
                sx={{
                  fontSize: "14.5px",
                  lineHeight: 1.7, 
                  color: "#475569",
                  textAlign: "justify",
                }}
              >
                {insights.summary}
              </Typography>
            </Box>
          </Paper>
        </AccentCard>
      </Grid>

      {/* LEFT: Recommendations */}
      <Grid item xs={12} md={6}>
        <AccentCard color="#f59e0b">
          <Paper sx={cardBase}>
            <SectionHeader title="التوصيات" color="#f59e0b" />

            <Stack spacing={0.6} sx={{ p: 1.5 }}> 
              {insights.recommendations?.length ? (
                insights.recommendations.map((item, i) => (
                  <ListItem key={i} text={item} index={i} />
                ))
              ) : (
                <Typography fontSize="13px" color="text.secondary">
                  لا توجد توصيات حالياً
                </Typography>
              )}
            </Stack>
          </Paper>
        </AccentCard>
      </Grid>

      {/* RIGHT: Opportunities */}
      <Grid item xs={12} md={6}>
        <AccentCard color="#10b981">
          <Paper sx={cardBase}>
            <SectionHeader title="الفرص" color="#10b981" />

            <Stack spacing={0.6} sx={{ p: 1.5 }}> 
              {insights.opportunities?.length ? (
                insights.opportunities.map((item, i) => (
                  <ListItem key={i} text={item} index={i} />
                ))
              ) : (
                <Typography fontSize="13px" color="text.secondary">
                  لا توجد فرص حالياً
                </Typography>
              )}
            </Stack>
          </Paper>
        </AccentCard>
      </Grid>
    </Grid>
  );
};

export default AnalyticsSection;