import React from "react";

import {
  changeOutsideTaskPosition,
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
  const cards = useSelector(cardSelector);
  const dispatch = useDispatch();

  // drag and drop
  const onDragEnd = (result: any, cards: any) => {
    if (!result.destination) return; // Возврат элемента назад, если вышел за рамки.
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Перекидывание таска между карточками.
      dispatch(changeOutsideTaskPosition({ cards, source, destination }));
    } else {
      dispatch(changeInsideTaskPosition({ cards, source, destination }));
    }
  };

  const createCard = async (e: EventType) => {
    let cardTitle = e.target.value;
    let btnChecker = e.key;
    if (btnChecker === "Enter" && cardTitle !== "") {
      let idForm, idInput, task;
      dispatch(createCards({ cards, cardTitle, idForm, idInput, task }));
      e.target.value = "";
    }
  };

  const createTask = (e: EventType, id: string | number) => {
    const titleTaskInput = e.target.value;

    if (e.key === "Enter" && titleTaskInput !== "") {
      dispatch(сreateTaskInsideCard({ cards, titleTaskInput, id }));
      e.target.value = "";
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
