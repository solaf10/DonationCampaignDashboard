import { Avatar, Badge, IconButton } from "@mui/material";
import "./Navbar.css";
import PageContainer from "./PageContainer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileModal from "./ProfileModal";
import AlertSection from "./DashboardSections/AlertsSection";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { getDashboardData } from "../services/dashboard";

const Navbar = () => {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await getDashboardData();

      console.log("API Response:", res);

      const alertsData = res?.data?.ai_insights?.alerts || [];

      console.log("Alerts:", alertsData);
      console.log(await getDashboardData());

      setAlerts(alertsData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setAlerts([]);
    }
  };

  fetchNotifications();
}, []);
  return (
    <nav>
      <PageContainer>
        <div className="admin-info">
          <Avatar
            src={
              user?.profile && user.profile !== "null"
                ? user.profile
                : undefined
            }
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor: "#d9d9d9",
            }}
            onClick={() => setIsProfileDialogOpen(true)}
          >
            {!user?.profile && <PersonIcon sx={{ fontSize: 36 }} />}
          </Avatar>

          <div className="text">
            <p className="name">{user?.name}</p>
            <p className="role">{user?.type}</p>
          </div>
        </div>

        <div className="actions">
          <div className="search">
            <img src="/search.svg" alt="" className="icon" />
            <input type="text" />
          </div>

          <IconButton onClick={() => setIsAlertsOpen(true)}>
            <Badge
              badgeContent={alerts.length}
              color="error"
              invisible={alerts.length === 0}
              max={99}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "11px",
                  minWidth: "20px",
                  height: "20px",
                  fontWeight: "bold",
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
      </PageContainer>

      <ProfileModal
        open={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      />

      <AlertSection
        open={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
      />
    </nav>
  );
};

export default Navbar;