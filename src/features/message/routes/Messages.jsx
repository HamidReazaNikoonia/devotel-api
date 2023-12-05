import React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { Layout } from "../../../components/Layout";
import { CardComponent } from "./../components/Card";

// API
import { useGetMessagesQuery } from "./../api/messageApi";

// Moch Data
const fakeData = [
  {
    id: 1,
    title: "message No1",
    bodyMessage:
      "lorem episum lorem episum lorem episum lorem episum lorem episum",
    notifyTime: "2020/01/03",
  },
  {
    id: 1,
    title: "message No1",
    bodyMessage:
      "lorem episum lorem episum lorem episum lorem episum lorem episum",
    notifyTime: "2020/01/03",
  },
  {
    id: 1,
    title: "message No1",
    bodyMessage:
      "lorem episum lorem episum lorem episum lorem episum lorem episum",
    notifyTime: "2020/01/03",
  },
];

export const Messages = () => {

  const [messagesData, setmessagesData] = React.useState([])

  const {
    data: messagesList,
    isLoading: isMessagesListLoading,
    isError,
    isSuccess
  } = useGetMessagesQuery();


  React.useEffect(() => {
    if (isSuccess) {
      if (messagesList?.results && Array.isArray(messagesList?.results)) {
        setmessagesData(messagesList.results)
        console.log(messagesList.results)
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
  }, [messagesList, isSuccess, isError, isMessagesListLoading]);

  return (
    <Layout title="Get All Messages">
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {Array.isArray(messagesData) &&
            messagesData.map((msg) => (
              <Grid item key={msg.id} xs={12} sm={6} md={4}>
                <CardComponent data={msg} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Layout>
  );
};
