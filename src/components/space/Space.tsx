import { InputProps } from "@material-ui/core";
import { TargetElement } from "@testing-library/user-event";
import React, { useEffect, useState } from "react";

import {
  Item,
  List,
  Container,
  Wrapper,
  AddCard,
  TextAddCard,
  ControlForm,
  InputForm,
  Title,
} from "./styles";

interface Cards {
  title?: string;
  space?: [];
}
interface ItemConf{
  title: string;
}

const OpenBoard = async (e: any) => {
  console.log(e, "OpenBoard");
};

const Space: React.FC<Cards> = () => {
  const [title, setTitle] = useState<string>("");
  const [space, setSpace] = useState<string[]>([]);
  useEffect(() => {});

  const SubmitNewCard = async (e: any) => {
    e.preventDefault();
    setSpace([...space, title]);
    console.log("hi");
  };

  const ListItems = () => {
    return space.map((item) => {
      console.log(item)
      <Wrapper>
        <List>
          <Item id={item.title} onClick={OpenBoard}>
            <Title component="span">{item.title}</Title>
          </Item>
        </List>
      </Wrapper>;
    });
  };

  return (
    <Container>
      <Wrapper>
        {ListItems}
        <AddCard>
          <Item onClick={(e) => SubmitNewCard(e)}>
            <TextAddCard component="span">Add Card</TextAddCard>
            <ControlForm className="CF">
              <InputForm
                id="filled-basic"
                label="Call me"
                variant="filled"
                autoComplete="off"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </ControlForm>
          </Item>
        </AddCard>
      </Wrapper>
    </Container>
  );
};
export default Space;
