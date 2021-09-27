import { InputProps } from "@material-ui/core";
import { TargetElement } from "@testing-library/user-event";
import React, { useState } from "react";

import {
  Item,
  List,
  Container,
  Wrapper,
  AddCard,
  TextAddCard,
  ControlForm,
  InputForm,
  //Items,
  Title,
} from "./styles";

interface Cards {
  title?: string;
}
const ViewBoard = async (e: any) => {
  console.log(e);
};

const CreateNewSpace = async (e: any) => {
  console.log(e.target);
};

const Space: React.FC<Cards> = () => {
  const [title, setTitle] = useState("");

  const HandlerNewCardTitle = async (e: any) => {
    setTitle(e);
    console.log(setTitle, "this setTitle");
  };

  console.log(title);
  return (
    <Container>
      <Wrapper>
        <List>
          <Item className="Card">
            <Title onClick={ViewBoard} component="span">
              Title
            </Title>
          </Item>
          <AddCard>
            <Item>
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
                  onChange={(e) => HandlerNewCardTitle(e.target.value)}
                />
              </ControlForm>
            </Item>
          </AddCard>
        </List>
      </Wrapper>
    </Container>
  );
};
export default Space;
