import React from "react";

import Board from "../components/Board/Board";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
// Разобраться с HOC.
const WorkBoard: React.FC = () => {
  return (
    <>
      <Header />
      <Board />
      <Footer />
    </>
  );
};
export default WorkBoard;
