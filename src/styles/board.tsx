import React from "react";

import { Button, Box, styled, TextField, FormControl } from "@material-ui/core";

export const Container = styled(Box)({
  height: "90%",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  position: "absolute",
  backgroundImage: "url('https://wallpapercave.com/wp/wp2760733.jpg')",
});
export const Wrapper = styled(Box)({
  margin: "10px",
  minHeight: "6%",
  minWidth: "6%",
  maxWidth: "45%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "flex-start",
  background:
    "rgb(60,235,237) linear-gradient(214deg, rgba(60,235,237,1) 24%, rgba(41,249,180,1) 93%)",
  borderRadius: "5px",
});
export const List = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  fontSize: "bold",
  margin: "10px",
  width: "170px",
  height: "100px",
  background: "grey",
  borderRadius: "5px",
});
export const Card = styled(Box)({
  padding: "5px",
  marginTop: "5px",
  transition: "all 1s ease",
  width: "85%",
  height: "20px",
  borderRadius: "5px",
  background: "white",
  "&:hover": {
    cursor: "pointer",
    transition: "all 1s ease",
  },
});
// для обрезания титула textOverflow: ellipsis
