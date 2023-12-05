import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


import DatePicker from 'react-date-picker';

// Custom UI Component
import { Layout } from "../../../components/Layout";

export const EditMessage = () => {

    const [value, onChange] = React.useState(new Date());

  return (
    <Layout title="Edit Message">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Your Message
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="bodyMessage"
              label="message"
              id="bodyMessage"
              autoComplete="message text"
              rows={6}
              multiline
            />

        {/* DATA PICKER */}
        <DatePicker onChange={onChange} value={value} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
