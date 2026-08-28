import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const PRIMARY = "#014a5b";

const cardStyle = {
  p: 2,
  borderRadius: "18px",
  background: "#fff",
  border: "1px solid #eef2f7",
  boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  height: "100%",
};

const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DashboardCharts = ({ charts }) => {
  if (!charts) return null;

  const parseMoney = (val) =>
    parseFloat(String(val || 0).replace(/[^0-9.]/g, "")) || 0;

  const monthlyRaw = charts?.monthly_donations || [];

  const monthlyData = allMonths.map((month) => {
    const found = monthlyRaw.find((i) => i.month === month);
    return {
      month,
      value: found ? parseMoney(found.total) : 0,
    };
  });

  const governoratesData =
    charts?.donations_by_governorates?.map((i) => ({
      label: i.governorate,
      value: Number(i.total) || 0,
    })) || [];

  const campaignsData =
    charts?.top_campaigns?.map((i) => ({
      label: i.campaign,
      value: Number(i.total) || 0,
    })) || [];

  const totalDonations = campaignsData.reduce(
    (acc, item) => acc + item.value,
    0,
  );

  // ================= LINE =================
  const lineOptions = {
    chart: { toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: [PRIMARY],
    dataLabels: { enabled: false },
    grid: { borderColor: "#eef2f7" },
    xaxis: {
      categories: monthlyData.map((i) => i.month),
    },
  };

  // ================= BAR =================
  const barOptions = {
    chart: { toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 3,
        barHeight: "20%",
        distributed: false,
      },
    },
    colors: [PRIMARY],
    dataLabels: { enabled: false },
    xaxis: {
      categories: governoratesData.map((i) => i.label),
    },
  };

  // ================= DONUT =================
  const donutOptions = {
    labels: campaignsData.map((i) => i.label),
    colors: ["#014a5b", "#0f6d83", "#2f91a5", "#56b9ca"],
    legend: {
      position: "bottom",
      fontSize: "12px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `$${totalDonations.toLocaleString()}`,
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(3, 1fr)",
        },
        gap: 1,
        marginTop: 4,
      }}
    >
      {/* LINE */}
      <Paper sx={cardStyle}>
        <Typography fontWeight={700} fontSize={8}>
          التبرعات الشهرية
        </Typography>

        <Chart
          type="area"
          height={220}
          options={lineOptions}
          series={[
            {
              name: "Donations",
              data: monthlyData.map((i) => i.value),
            },
          ]}
        />
      </Paper>

      {/* BAR */}
      <Paper sx={cardStyle}>
        <Typography fontWeight={700} fontSize={14} mb={1}>
          التبرع بكل محافظة
        </Typography>

        <Chart
          type="bar"
          height={220}
          options={barOptions}
          series={[
            {
              name: "Donations",
              data: governoratesData.map((i) => i.value),
            },
          ]}
        />
      </Paper>

      {/* DONUT */}
      <Paper sx={cardStyle}>
        <Typography fontWeight={700} fontSize={14} mb={1}>
          الحملات الأعلى تبرعاً
        </Typography>

        <Chart
          type="donut"
          height={220}
          options={donutOptions}
          series={campaignsData.map((i) => i.value)}
        />
      </Paper>
    </Box>
  );
};

export default DashboardCharts;
