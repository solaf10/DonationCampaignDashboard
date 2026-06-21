import {
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Badge,
} from "@mui/material";

import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AlertSection = ({ open, onClose, alerts = [] }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          fontWeight: 700,
          fontSize: "1.1rem",
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Badge
            color="error"
            variant={alerts.length ? "dot" : "standard"}
            invisible={alerts.length === 0}
          >
            <NotificationsActiveRoundedIcon
              sx={{
                color: "#1976d2",
                fontSize: 30,
                filter: "drop-shadow(0px 3px 8px rgba(25, 118, 210, 0.35))",
                transition: "0.25s",
                "&:hover": {
                  transform: "scale(1.1) rotate(-8deg)",
                  color: "#0d47a1",
                },
              }}
            />
          </Badge>

          <span style={{ fontWeight: 700 }}>التنبيهات</span>
        </Stack>

        <IconButton
          onClick={onClose}
          sx={{
            backgroundColor: "rgba(0,0,0,0.04)",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
              transform: "rotate(90deg)",
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent>
        {alerts.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            لا يوجد تنبيهات
          </Typography>
        ) : (
          <Stack spacing={2}>
            {alerts.map((alert, index) => (
              <Alert
                key={index}
                variant="outlined"
                severity={alert.severity || "warning"}
                sx={{ borderRadius: 2 }}
              >
                <AlertTitle>
                  {alert.title || "تنبيه"}
                </AlertTitle>

                {alert.message || alert}
              </Alert>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AlertSection;