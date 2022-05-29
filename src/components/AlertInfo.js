import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AlertInfo = () => {
  return (
    <motion.div
      className="absolute z-10 mt-1 ml-1 "
      role="alert"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Alert
        severity="info"
        sx={{ fontSize: 12, padding: 0, paddingLeft: 1, paddingRight: 1 }}
        icon={<InfoIcon fontSize="small" />}
      >
        Kliknij na mapę, aby dodać pinezkę.
      </Alert>
    </motion.div>
  );
};
