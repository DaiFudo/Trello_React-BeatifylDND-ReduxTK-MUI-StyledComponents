import { InputProps } from "@material-ui/core";
import { TargetElement } from "@testing-library/user-event";
import React, { useState } from "react";

import {
  List,
  Card,
  Container,
  Wrapper,
  AddCard,
  TextAddCard,
  ControlForm,
  InputForm,
} from "./styles";

const CreateNewCard = async (e: any) => {
  console.log(e.target.value);
};

const Space: React.FC = () => {
  const [title, setTitle] = useState("");

  return (
    <Container>
      <Wrapper>
        <List>
          <Card component="span">Title</Card>
        </List>
        <AddCard>
          <List>
            <TextAddCard onClick={CreateNewCard} component="span">
              Add Card
            </TextAddCard>
            <ControlForm>
              <InputForm
                id="filled-basic"
                label="Call me"
                variant="filled"
                autoComplete="off"
              />
            </ControlForm>
          </List>
        </AddCard>
      </Wrapper>
    </Container>
  );
};
export default Space;
