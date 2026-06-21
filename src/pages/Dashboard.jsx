import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

import { getDashboardData } from "../services/dashboard";

import AlertsSection from "../components/DashboardSections/AlertsSection";
import DashboardStats from "../components/DashboardSections/DashboardStats";
import DashboardCharts from "../components/DashboardSections/DashboardCharts";
import AnalyticsSection from "../components/DashboardSections/AnalyticsSection";
import ForecastsSection from "../components/DashboardSections/ForecastsSection";

import PageContainer from "../components/PageContainer";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardData();

      const data = res?.data;

      console.log("FULL DASHBOARD:", data);

      setDashboard(data);
      setAlerts(data?.ai_insights?.alerts || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#014a5b" }} />
      </Box>
    );
  }

  if (!dashboard) {
    return (
      <Box>
        <Typography color="error">
          فشل تحميل بيانات لوحة التحكم
        </Typography>
      </Box>
    );
  }

  return (
    <PageContainer>
  <Box
  sx={{
    mb: 4,
    p: 0.75,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(226,232,240,0.8)",
    borderRadius: "18px",
    boxShadow: `
      0 1px 2px rgba(0,0,0,0.04),
      0 8px 24px rgba(15,23,42,0.06)
    `,
  }}
>
  <Tabs
    value={activeTab}
    onChange={(e, value) => setActiveTab(value)}
    variant="fullWidth"
    sx={{
      minHeight: 58,

      "& .MuiTabs-indicator": {
        display: "none",
      },

      "& .MuiTab-root": {
        minHeight: 52,
        borderRadius: "14px",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: 700,
        color: "#64748b",
        transition: "all .3s ease",
        position: "relative",

        "&:hover": {
          color: "#014a5b",
          background: "rgba(1,74,91,0.05)",
        },
      },

      "& .Mui-selected": {
        color: "#014a5b !important",
        background: "#fff",

        boxShadow: `
          0 1px 3px rgba(0,0,0,.06),
          0 8px 18px rgba(1,74,91,.10)
        `,

        "&::before": {
          content: '""',
          position: "absolute",
          top: 8,
          bottom: 8,
          right: 0,
          width: 4,
          borderRadius: 10,
          background:
            "linear-gradient(180deg,#014a5b,#00b8a9)",
        },
      },
    }}
  >
    <Tab label="نظرة عامة" />
    <Tab label="التحليلات" />
    <Tab label="المخاطر والتنبؤات" />
  </Tabs>
</Box>

      {activeTab === 0 && (
        <>
          <AlertsSection alerts={alerts} />

          <DashboardStats
            statistics={dashboard.statistics}
          />

          <DashboardCharts
            charts={dashboard.charts}
          />
        </>
      )}

      {activeTab === 1 && (
        <AnalyticsSection
          insights={dashboard.ai_insights}
        />
      )}
{activeTab === 2 && (
  <ForecastsSection
    data={dashboard}
  />
)}
    </PageContainer>
  );
};

export default Dashboard;