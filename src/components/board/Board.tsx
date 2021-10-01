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

type eventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const Board: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useState<
    { title: string; idForm: string; idInput: string; task?: any[] }[]
  >([]);
  /* const ref = React.useRef(null); */

  const createBoard = async (e: eventType) => {
    console.log(e.target.value);

    setTitle(e.target.value);
    if (e.key === "Enter" && title !== "" && !!e.target.value) {
      console.log("from MakeBoards", e);
      let arr = cards;
      const id = uuidv4();
      arr.push({ title: title, idForm: id, idInput: id });
      setCards(arr);
      e.target.value = "";
      /* console.log(ref); */
    }
  };
  const createTask = (e: eventType, id: string) => {
    if (e.key === "Enter" && title !== "") {
      /* if(cards.idForm === cards.idInput){

      } */

      let arr = cards;
      console.log(cards);

      let res = arr.findIndex((item) => item.idForm === id);
      console.log(res);

      /* setCards({
        cards.slice(0, res),
        {...cards[res], tasks: cards[res].push(e.target.value)},
        cards.slice(res + 1)
      }) 
      //console.log(res);
     let inputTaskValue = e.target.value;
      let arr = [];
      arr.push({ ...cards, task: inputTaskValue });
      setCards(arr);   */
    }
  };

  const renderListCards = () => {
    return cards.map((item) => {
      const renderInputForTask = () => {
        return (
          <InputForm
            /* ref={ref} */
            key={item.idInput}
            id="filled-basic"
            label="New task"
            variant="filled"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e: eventType) => createTask(e, item.idForm)}
          />
        );
      };

      return (
        <Card key={item.idForm}>
          <Title>{item.title}</Title>
          <List>{item.task}</List>
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
              onKeyDown={(e: eventType) => {
                createBoard(e);
              }}
            />
          </AddCard>
        </Cards>
      </Wrapper>
    </Container>
  );
};
export default Board;

//ListCards - ListItem (state: {title: string, tasks: string[]})
