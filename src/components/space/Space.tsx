import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

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

const Space: React.FC<Cards> = () => {
  const [title, setTitle] = useState<string>(""); // Почему у меня тут новый тайтл я же его удалил
  const [space, setSpace] = useState<{ title: string; id: string }[]>([]);
 //например лист boards
  const history = useHistory();

  const handleKeyDownInput = async (e: any) => {
    if (e.key === "Enter" && title !== "") {
      let arr = space;
      arr.push({ title: title, id: uuidv4() });
      setSpace(arr);
      setTitle("");
    }
  };
  const ListItems = () => {
    return space.map((item) => {
      if (item.title !== "") {
        return (
          <Item key={item.id} onClick={() => OpenBoard(item)}>
            <Title component="span">{item.title}</Title>
            <Link to={`/workboard/${item.id}`}></Link>
          </Item>
        );
      }
    });
  };
  const OpenBoard = (item: any) => {
    if (item.id) {
      return history.push(`/Workboard/${item.id}`);
    }
  };
  return (
    <Container>
      <Wrapper>
        <List> {ListItems()}</List>
        <AddCard>
          <Item>
            <TextAddCard component="span">Add Card</TextAddCard>
            <ControlForm className="CF">
              <InputForm
                id="filled-basic"
                variant="filled"
                autoComplete="off"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => handleKeyDownInput(e)}
              />
            </ControlForm>
          </Item>
        </AddCard>
      </Wrapper>
    </Container>
  );
};
export default Space;
