import React from "react";
import { Card, Container, List, Wrapper } from "../../styles/board";

const Board: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <List>
          <Card component="a">Title</Card>
        </List>
      </Wrapper>
    </Container>
  );
};
export default Board;
