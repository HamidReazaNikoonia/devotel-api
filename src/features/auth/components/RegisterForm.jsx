import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

// API
import { useRegisterUserMutation } from "../api/authApi";

const APP_LOCAL_STORAGE_PREFIX =
  process.env.REACT_APP_LOCAL_STORAGE_PREFIX || "";

export default function SignInSide() {
  const navigate = useNavigate();

  const [formInput, setformInput] = React.useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [
    registerUser,
    { isLoading: registerIsLoading, isSuccess, error, isError, data },
  ] = useRegisterUserMutation();

  React.useEffect(() => {
    if (isSuccess) {
      if (data) {
        if (data?.tokens) {
          localStorage.setItem(
            `${APP_LOCAL_STORAGE_PREFIX}/token`,
            data?.tokens?.access?.token
          );
          toast.success("User registered successfully");
          navigate("/verifyemail");
        }
      }
    }

    if (isError) {
      console.log(error);
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error(error.data.message, {
          position: "top-right",
        });
      }
    }
  }, [registerIsLoading, isSuccess, isError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Form Validation
    if (formInput.password !== formInput.confirmPassword) {
      toast.error("Password and confirm should be equal");
      return false;
    }

    if (
      formInput.name === "" ||
      formInput.password === "" ||
      formInput.password.length < 8 ||
      formInput.email === ""
    ) {
      toast.error("Please Fill Form Correctly");
      return false;
    }

    // Call API
    registerUser({
      name: formInput.name,
      password: formInput.password,
      email: formInput.email,
    });
    console.log(formInput);
  };

  return (
    <>
      <Grid container component="main">
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                value={formInput.email}
                onChange={(e) =>
                  setformInput({ ...formInput, email: e.target.value })
                }
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                value={formInput.name}
                onChange={(e) =>
                  setformInput({ ...formInput, name: e.target.value })
                }
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="Name"
                autoFocus
              />

              <TextField
                margin="normal"
                value={formInput.password}
                onChange={(e) =>
                  setformInput({ ...formInput, password: e.target.value })
                }
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <TextField
                margin="normal"
                value={formInput.confirmPassword}
                onChange={(e) =>
                  setformInput({
                    ...formInput,
                    confirmPassword: e.target.value,
                  })
                }
                required
                fullWidth
                name="confirm_password"
                label="confirm password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Do you have an account ? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
