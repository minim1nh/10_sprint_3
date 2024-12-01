"use client";

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarNotificationProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
