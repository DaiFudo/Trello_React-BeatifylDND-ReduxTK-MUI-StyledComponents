import { InputProps } from "@material-ui/core";
import { TargetElement } from "@testing-library/user-event";
import React, { useState } from "react";

import {
  List,
  Container,
  Wrapper,
  AddCard,
  TextAddCard,
  ControlForm,
  InputForm,
  Items,
  Title,
} from "./styles";

const ViewBoard = async (e: any) => {
  console.log(e);
};
const CreateNewSpace = async (e: any) => {
  console.log(e.target);
};

const InputHandlerSpace = async (e: any) => {
  console.log(e, "this input");
};

const Space: React.FC = () => {
  const [title, setTitle] = useState("");

  return (
    <Container>
      <Wrapper>
        <List className="Card">
          <Title onClick={ViewBoard} component="span">
            Title
          </Title>
        </List>
        <AddCard>
          <List>
            <TextAddCard onClick={CreateNewSpace} component="span">
              Add Card
            </TextAddCard>
            <ControlForm>
              <InputForm
                id="filled-basic"
                label="Call me"
                variant="filled"
                autoComplete="off"
                type="text"
                onChange={(e) => InputHandlerSpace(e.target.value)}
              />
            </ControlForm>
          </List>
        </AddCard>
      </Wrapper>
    </Container>
  );
};
export default Space;
