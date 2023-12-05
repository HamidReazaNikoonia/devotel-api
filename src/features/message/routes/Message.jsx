import React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Layout } from "../../../components/Layout";
import { CardComponent } from "./../components/Card";

// Moch Data
const fakeData =
  {
    id: 1,
    status: true,
    title: "message No1",
    bodyMessage:
      "lorem episum lorem episum lorem episum lorem episum lorem episum",
    notifyTime: "2020/01/03",
  };

export const Message = () => {

  const {title, status, bodyMessage, notifyTime} = fakeData;

  return (
    <Layout title="Get Message">
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Status: {status ? 'Sent' : 'Will Be Send...'}
                </Typography>
                <Typography variant="h5" component="div">
                 {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {notifyTime}
                </Typography>
                <Typography variant="body2">
                  {bodyMessage}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
