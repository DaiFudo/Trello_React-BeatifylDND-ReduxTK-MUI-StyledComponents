import React from "react";

import { Button, Box, styled, TextField, FormControl } from "@material-ui/core";

export const Container = styled(Box)({
  height: "90%",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  background: "rgba(205, 205, 205, 1)",
});
export const Wrapper = styled(Box)({
  minHeight: "6%",
  minWidth: "6%",
  maxWidth: "45%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "flex-start",
  margin: "0 auto",
  background: "white",
  borderRadius: "5px",
});
export const Item = styled(Box)({
  fontSize: "bold",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  width: "102px",
  height: "100px",
  background: "grey",
  borderRadius: "5px",
  transition: "all 1s ease",
  "&:hover": {
    cursor: "pointer",
    background:
      "rgb(60,235,237) linear-gradient(214deg, rgba(60,235,237,1) 24%, rgba(41,249,180,1) 93%)",
    transition: "all 1s ease",
  },
});
export const List = styled(Box)({
  display: "flex",
});
export const Title = styled(Box)({
  padding: "5px",
  display: "flex",
});
export const AddCard = styled(Box)({
  transition: "all 1s ease",
  "&:hover": {
    borderRadius: "5px",
    background:
      "rgb(237,60,215) linear-gradient(214deg, rgba(237,60,215,1) 20%, rgba(82,41,249,1) 96%)",
    transition: "all 1s ease",
  },
  "&:after": {
    transition: "all 1s ease",
  },
});
export const TextAddCard = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
  margin: "0 auto",
});

export const ControlForm = styled(FormControl)({
  borderRadius: "5px",
  display: "flex",
  margin: "0 auto",
  width: "93px",
});
export const InputForm = styled(TextField)({
  marginTop: "10px",
});
