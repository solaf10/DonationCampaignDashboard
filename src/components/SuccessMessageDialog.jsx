import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import { CheckCircle } from "@mui/icons-material";

export default function SuccessMessageDialog({
  isOpen,
  setIsOpen,
  title,
  message,
  primaryButtonText = "OK",
  onPrimaryAction,
  navigateAfterClose,
  navigate,
}) {
  const handleClose = () => {
    setIsOpen(false);
    if (navigateAfterClose && navigate) {
      navigate(navigateAfterClose);
    }
  };

  const handlePrimary = () => {
    setIsOpen(false);
    if (onPrimaryAction) onPrimaryAction();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <CheckCircle sx={{ fontSize: 50, color: "green" }} />
        <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        <Button
          style={{ backgroundColor: "var(--main-color)" }}
          variant="contained"
          onClick={handlePrimary}
        >
          {primaryButtonText}
        </Button>

        <Button style={{ Color: "var(--main-color)" }} onClick={handleClose}>
          لاحقًا
        </Button>
      </DialogActions>
    </Dialog>
  );
}
