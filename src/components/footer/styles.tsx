import React from "react";

import { Button, Box, styled, TextField, FormControl } from "@material-ui/core";

export const Container = styled(Box)({
  height: "70px",
  width: "100%",
  display: "flex",
  position: "absolute",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 auto",
  bottom: "0",
  background:
    "rgb(60,235,237) linear-gradient(214deg, rgba(60,235,237,1) 24%, rgba(41,108,249,1) 93%)",
});
export const Title = styled(Box)({
  display: "flex",
  margin: "0 auto",
  fontSize: "30px",
  textShadow: "0px 1px 13px #ffffff",
});
