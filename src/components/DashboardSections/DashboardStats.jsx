import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const DashboardStats = ({ statistics = {} }) => {
  const cards = [
    {
      title: "إجمالي التبرعات",
      value: `$${statistics?.total_donations ?? 0}`,
      icon: <VolunteerActivismRoundedIcon />,
      color: "#0F766E",
    },
    {
      title: "عدد المتبرعين",
      value: statistics?.total_donors ?? 0,
      icon: <PeopleAltRoundedIcon />,
      color: "#2563EB",
    },
    {
      title: "إجمالي المشاريع",
      value: statistics?.total_projects ?? 0,
      icon: <FolderRoundedIcon />,
      color: "#4F46E5",
    },
    {
      title: "المشاريع المكتملة",
      value: statistics?.completed_projects ?? 0,
      icon: <CheckCircleRoundedIcon />,
      color: "#0891B2",
    },
    {
      title: "المشاريع غير المكتملة",
      value: statistics?.uncompleted_projects ?? 0,
      icon: <PendingActionsRoundedIcon />,
      color: "#6366F1",
    },
    {
      title: " المبلغ المتبقي في التفاصيل النشطة",
      value: `$${statistics?.active_details_funding_gap ?? 0}`,
      icon: <AccountBalanceWalletRoundedIcon />,
      color: "#475569",
    },
    {
      title: "نسبة التقدم في التمويل",
      value: statistics?.funding_progress_rate ?? "0%",
      icon: <TrendingUpRoundedIcon />,
      color: "#0284C7",
    },
    {
      title: "عدد التبرعات العينية",
      value: statistics?.total_inkind_donation ?? 0,
      icon: <VolunteerActivismRoundedIcon />,
      color: "#D97706"
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
        width: "100%",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            minHeight: 100,
            borderRadius: "14px",
            position: "relative",
            overflow: "hidden",
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
            transition: "all 0.2s ease",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "3px",
              background: card.color,
            },

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(15,23,42,0.10)",
            },
          }}
        >
          <CardContent
            sx={{
              py: 1,
              px:0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,

              "&:last-child": {
                paddingBottom: 1.5,
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: `${card.color}15`,
                color: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                "& svg": {
                  fontSize: 26,
                },
              }}
            >
              {card.icon}
            </Box>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.85rem",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: 800,
                color: card.color,
                lineHeight: 1,
              }}
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DashboardStats;