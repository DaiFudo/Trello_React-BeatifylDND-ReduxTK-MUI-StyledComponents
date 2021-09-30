import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

import {
  Item,
  Container,
  List,
  Wrapper,
  Card,
  InputForm,
  ControlForm,
  AddCard,
  Cards,
  TextAddCard,
  DeleteIcon,
  Title,
} from "./styles";

type eventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const Board: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useState<
    { title: string; idForm: string; idInput: string; task?: string }[]
  >([]);

  const MakeBoards = async (e: eventType) => {
    if (e.key === "Enter" && title !== "") {
      console.log("from MakeBoards", e);
      let arr = cards;
      const id = uuidv4();
      arr.push({ title: title, idForm: id, idInput: id });
      setCards(arr);
      setTitle("");
      e.target.value = "";
    }
  };
  const MakeTasks = (e: eventType) => {
    console.log("from MakeTasks", e.target.value);
    if (e.key === "Enter" && title !== "") {
      let arr = cards;
      let res = arr.find();
      console.log(res);
      let inputTaskValue = e.target.value;

      /* arr.push({ task: inputTaskValue});
      setCards(arr); */
    }
  };

  const ListCards = () => {
    return cards.map((item) => {
      const inputs = () => {
        return (
          <InputForm
            key={item.idInput}
            id="filled-basic"
            label="New task"
            variant="filled"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e: eventType) => MakeTasks(e)}
          />
        );
      };

      if (item.title !== "") {
        return (
          <Card key={item.idForm}>
            <Title>{item.title}</Title>
            <List>{item.task}</List>
            {inputs()}
          </Card>
        );
      }
    });
  };

  return (
    <Container>
      <Wrapper>
        <Cards>
          {ListCards()}

          <Card>
            <Title>Пример</Title>
            <List>
              <Item component="a">
                Закопать людей <DeleteIcon />
              </Item>
              <Item component="a">
                Взрастить детей
                <DeleteIcon />
              </Item>
              <Item component="a">
                Удалить зубы у хейтеров <DeleteIcon />
              </Item>
            </List>
            <ControlForm>
              <InputForm
                id="filled-basic"
                label="New task"
                variant="filled"
                autoComplete="off"
              />
            </ControlForm>
          </Card>

          <AddCard>
            <List>
              <TextAddCard>Add Card</TextAddCard>
            </List>
            <InputForm
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e: eventType) => MakeBoards(e)}
            />
          </AddCard>
        </Cards>
      </Wrapper>
    </Container>
  );
};
export default Board;
