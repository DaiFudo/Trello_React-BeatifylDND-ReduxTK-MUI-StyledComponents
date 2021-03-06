import { Box, styled, TextField, FormControl } from "@material-ui/core";

import Delete from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

export const Wrapper = styled(Box)({
  margin: "10px",
  minHeight: "6%",
  minWidth: "6%",
  maxWidth: "99%",
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
    "linear-gradient(214deg, rgba(237,60,215,1) 20%, rgba(82,41,249,1) 96%)",
  border: "1px black",
});
export const Cards = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "100px",
  div: {
    display: "flex",
    alignItems: "flex-start",
  },
});
export const HeaderCard = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "75%",
});
export const List = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignContent: "flex-start",
  fontSize: "bold",
  margin: "10px",
  width: "170px",
  minHeight: "100px",
  background: "grey",
  borderRadius: "5px",
});
export const Item = styled(Box)({
  padding: "5px",
  margin: "10px  5px",
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
export const Title = styled(Box)({
  marginTop: "5px",
  backgroundColor:
    "radial-gradient(circle, rgb(63,184,251,1) 50%, rgba(85,70,252,1) 98%)",
  borderRadius: "5px",
});
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
export const CloseBtn = styled(CloseIcon)({
  fontSize: "28px",
  "&:hover": {
    cursor: "pointer",
  },
  //zIndex: "2",
});

// Dnd-Div

// @ts-ignore
/* export const DndDiv = styled.div`
  display: flex;
`; */

export const DndDiv = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});
