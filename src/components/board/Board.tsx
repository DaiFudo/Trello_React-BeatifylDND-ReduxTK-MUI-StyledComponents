import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

import {
  Item,
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
import Container from "../UI/Container/Container";

type EventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

interface ICard {
  title: string;
  idForm: string;
  idInput: string;
  task: string[];
}

const Board: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  const createBoard = async (e: EventType) => {
    let boardTitle = e.target.value;
    if (e.key === "Enter" && boardTitle !== "") {
      const id = uuidv4();
      setCards([
        ...cards,
        {
          title: boardTitle,
          idForm: id,
          idInput: id,
          task: [],
        },
      ]);
      e.target.value = "";
    }
  };

  const createTask = (e: EventType, id: string | number) => {
    const newTask = e.target.value;

    if (e.key === "Enter" && newTask !== "") {
      setCards(
        cards.map((item) => {
          if (item.idForm === id) {
            item.task.push(newTask);
            e.target.value = "";
          }
          return item;
        })
      );
    }
  };

  const renderListCards = () => {
    return cards.map((item) => {
      const renderInputForTask = () => {
        return (
          <InputForm
            key={item.idInput}
            id="filled-basic"
            label="New task"
            variant="filled"
            autoComplete="off"
            onKeyDown={(e: EventType) => createTask(e, item.idForm)}
          />
        );
      };

      return (
        <Card key={item.idForm}>
          <Title>{item.title}</Title>
          <List>
            {item.task?.map((task) => (
              <Item component="a" key={uuidv4()}>
                {task}
                <DeleteIcon />
              </Item>
            ))}
          </List>
          {renderInputForTask()}
        </Card>
      );
    });
  };

  return (
    <Container>
      <Wrapper>
        <Cards>
          {renderListCards()}
          <AddCard>
            <List>
              <TextAddCard>Add Card</TextAddCard>
            </List>
            <InputForm
              autoComplete="off"
              onKeyDown={(e: EventType) => createBoard(e)}
            />
          </AddCard>
        </Cards>
      </Wrapper>
    </Container>
  );
};
export default Board;
