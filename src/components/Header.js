import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modalSlice";
import logo from "../assets/img/logo.png";
export const Header = ({ children }) => {
  const { showModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              flexGrow: 1,
              marginRight: 2,
            }}
          >
            <img src={logo} alt="logoApp" className="object-fill h-10  " />
          </Typography>

          {children}

          <Button
            color="info"
            sx={{ marginLeft: 2 }}
            variant="contained"
            size="small"
            onClick={() => dispatch(openModal())}
            disabled={showModal ? true : false}
          >
            Dodaj łowisko
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
