import React from "react";

import { LinkProps, Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";



const Link = props => {
  return (
    <MuiLink underline="none" color="white" {...props} component={ReactRouterLink} to={props.href ?? "#"} />
  );
};

export default Link;