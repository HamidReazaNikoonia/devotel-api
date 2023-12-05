import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Icons
import AddIcon from "@mui/icons-material/Add";

// Custom Component
import { Head } from "./../Head";

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <AppBar position="relative">
        <Toolbar>
          <Link
            to={{
              pathname: "/message/create",
            }}
          >
            <AddIcon fontSize="large" sx={{ mr: 2 }} />
            
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
              Create New Message
            </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 5 }} maxWidth="md">
          {children}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </>
  );
};
