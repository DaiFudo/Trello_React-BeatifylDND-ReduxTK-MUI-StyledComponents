import React from "react";

import { Button, Box, styled, TextField, FormControl } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

export const Wrapper = styled(Box)({
  margin: "10px",
  minHeight: "6%",
  minWidth: "6%",
  maxWidth: "45%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "flex-start",
  borderRadius: "5px",
});
export const Card = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  fontSize: "bold",
  margin: "10px",
  width: "170px",
  minHeight: "100px",
  borderRadius: "5px",
  background:
    "rgb(60,235,237) linear-gradient(214deg, rgba(60,235,237,1) 24%, rgba(41,249,180,1) 93%)",
});
export const Cards = styled(Box)({
  display: "flex",
});
export const List = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  fontSize: "bold",
  margin: "10px",
  width: "170px",
  minHeight: "100px",
  background: "grey",
  borderRadius: "5px",
});
export const Item = styled(Box)({
  padding: "5px",
  margin: "10px 5px 10px 5px",
  transition: "all 1s ease",
  width: "85%",
  minHeight: "20px",
  borderRadius: "5px",
  background: "white",
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    cursor: "pointer",
    transition: "all 1s ease",
  },
});
export const ControlForm = styled(FormControl)({
  borderRadius: "5px",
});
export const Title = styled(Box)({});
export const InputForm = styled(TextField)({
  marginTop: "10px",
  borderRadius: "5px",
  width: "130px",
  display: "flex",
  justifyContent: "flex-end",
});
// Для обрезания титула textOverflow: ellipsis

//Пустая карточка
export const AddCard = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  fontSize: "bold",
  margin: "10px",
  width: "170px",
  minHeight: "100px",
  background: "grey",
  borderRadius: "5px",
  "&:hover": {
    cursor: "pointer",
    transition: "all 1s ease",
    content: "+",
    background:
      "rgb(60,235,237) linear-gradient(214deg, rgba(60,235,237,1) 24%, rgba(41,249,180,1) 93%)",
  },
  "&:nth-last-child(1)": {
    borderBottom: "1px solid #79b6f2",
    background: "white",
  },
});
export const TextAddCard = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
});
export const DeleteIcon = styled(Delete)({
  fontSize: "20px",
});
