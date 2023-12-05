import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Custom Components
import Link from "../../../../components/Link";

export const CardComponent = ({ data }) => {
  const { title, bodyMessage, notifyTime } = data;

  return (
    <>
      <Card
        className="card_animation"
        sx={{ height: "100%", display: "flex", flexDirection: "column", p: 1 }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography color="white" gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography color="white">{bodyMessage}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small">
            <Link href="/message/545465">View</Link>
          </Button>

          <Button variant="contained" size="small">
            <Link href="/message/edit/545465">Edit</Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
