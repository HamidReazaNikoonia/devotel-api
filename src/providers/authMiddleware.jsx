import React from "react";

// UI Components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


import { userApi } from "../features/user/api/userApi";

const AuthMiddleware = ({ children }) => {
  const isLoggedIn = true;

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: isLoggedIn,
  });

  // window.location.assign('/auth/login');

  if (isLoading) {
    return (
      <Container sx={{ py: 5 }} maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress  />
        </Box>
      </Container>
    );
  }

  return children;
};

export default AuthMiddleware;
