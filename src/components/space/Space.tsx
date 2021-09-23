import React from "react";
import { List, Card, Container, Wrapper } from "../../styles/space";

const Space: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <List>
          <Card component="a">Text</Card>
        </List>
      </Wrapper>
    </Container>
  );
};
export default Space;
