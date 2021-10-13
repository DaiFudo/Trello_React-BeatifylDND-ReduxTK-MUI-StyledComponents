import React from "react";

import {
  changeInsideTaskPosition,
  сreateTaskInsideCard,
  cardSelector,
  createCards,
} from "../../store/boardStore";
import { useSelector, useDispatch } from "react-redux";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

import Container from "../UI/Container/Container";
import {
  List,
  Wrapper,
  Card,
  InputForm,
  AddCard,
  Cards,
  TextAddCard,
  Title,
  Item,
  DeleteIcon,
} from "./style";

type EventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const Board: React.FC = () => {
  const cards = useSelector(cardSelector); // naming
  const dispatch = useDispatch();

  // drag and drop
  const onDragEnd = (result: any, cards: any) => {
    console.log("cards", cards);

    if (!result.destination) return console.log("back"); // Возврат элемента назад, если вышел за рамки.
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Перекидывание таска между карточками.
      const sourceCard = cards.find(
        (item: any) => item.idForm === source.droppableId
      );
      const destCard = cards.find(
        (item: any) => item.idForm === destination.droppableId
      );
      const sourceTask = [...sourceCard.task];
      const destTask = [...destCard.task];
      const [removed] = sourceTask.splice(source.index, 1);
      destTask.splice(destination.index, 0, removed);

      const changeTasks = cards.map((item: any) => {
        destTask.find((item: any) => item.task === destination.task);

        return item;
      });
      changeTasks();
    } else {
      dispatch(changeInsideTaskPosition({ cards: cards, source, destination }));
    }
  };

  //

  const createCard = async (e: EventType) => {
    let cardTitle = e.target.value;
    let btnChecker = e.key;
    if (btnChecker === "Enter" && cardTitle !== "") {
      console.log("cards", cards);
      let idForm, idInput, task;
      dispatch(createCards({ cards, cardTitle, idForm, idInput, task }));
      e.target.value = "";
    }
  };

  const createTask = (e: EventType, id: string | number) => {
    const newTask = e.target.value;
    console.log("id", id);

    if (e.key === "Enter" && newTask !== "") {
      dispatch(сreateTaskInsideCard({ newTask, id }));

      /* setCards(
        cards.map((item:any) => {
          if (item.idForm === id) {
            item.task.push({ titleTask: newTask, id: uuidv4() });
            e.target.value = "";
          }
          return item;
        })
      ); */
    }
  };

  const renderListCards = () => {
    return cards.map((item: any) => {
      return (
        <Cards>
          <Card key={item.idForm}>
            <Title>{item.title}</Title>
            <List>
              <Droppable droppableId={item.idForm} key={item.idForm}>
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {item.task.map((task: any, index: any) => {
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Item component="a">
                                    {task.titleTask} <DeleteIcon />
                                  </Item>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </List>
            <InputForm
              key={item.idInput}
              id="filled-basic"
              label="New task"
              variant="filled"
              autoComplete="off"
              onKeyDown={(e: EventType) => createTask(e, item.idForm)}
            />
          </Card>
        </Cards>
      );
    });
  };

  return (
    <Container>
      <Wrapper>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, cards)}>
          <Cards>
            {renderListCards()}
            <AddCard>
              <List>
                <TextAddCard>Add Card</TextAddCard>
              </List>
              <InputForm
                autoComplete="off"
                onKeyDown={(e: EventType) => createCard(e)}
              />
            </AddCard>
          </Cards>
        </DragDropContext>
      </Wrapper>
    </Container>
  );
};
export default Board;
