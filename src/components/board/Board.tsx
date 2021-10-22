import React from "react";

import {
  changeCardsPosition,
  changeOutsideTaskPosition,
  changeInsideTaskPosition,
  сreateTaskInsideCard,
  cardSelector,
  createCards,
} from "../../store/boardStore";

import { useSelector, useDispatch } from "react-redux";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

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
  DndDiv,
} from "./style";
type EventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const Board: React.FC = () => {
  const cards = useSelector(cardSelector);
  const dispatch = useDispatch();

  // drag and drop
  const onDragEnd = (result: DropResult, cards: ResponderProvided) => {
    if (!result.destination) return; // Возврат элемента назад, если вышел за рамки.
    const { source, destination } = result;

    if (source.droppableId && destination.droppableId === "Groups") {
      console.log("source.index", source.index);
      console.log("destination.index", destination.index);

      dispatch(changeCardsPosition({ cards, source, destination })); // тут продолжить за Кирилло
    }
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
    return (
      <Droppable direction="horizontal" droppableId={`Groups`} type="COLUMN">
        {(provided) => {
          return (
            <DndDiv {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((item: any, indexCard: number) => {
                // оьбратить внимание на  index by Diana
                return (
                  <Draggable
                    key={item.idForm}
                    draggableId={`Groups-${item.idForm}`}
                    index={indexCard}
                  >
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Cards className="Cards">
                            <Card className="Card" key={item.idForm}>
                              <Title>{item.title}</Title>
                              <List>
                                <Droppable
                                  direction="vertical"
                                  droppableId={item.idForm}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {item.task.map(
                                        (task: any, indexTask: number) => {
                                          return (
                                            <Draggable
                                              key={task.id}
                                              draggableId={`Tasks-${task.id}`}
                                              index={indexTask}
                                            >
                                              {(provided) => {
                                                return (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                  >
                                                    <Item component="a">
                                                      {task.titleTask}
                                                      <DeleteIcon />
                                                    </Item>
                                                  </div>
                                                );
                                              }}
                                            </Draggable>
                                          );
                                        }
                                      )}
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              </List>

                              <InputForm
                                key={item.idInput}
                                id="filled-basic"
                                label="New task"
                                variant="filled"
                                autoComplete="off"
                                onKeyDown={(e: EventType) =>
                                  createTask(e, item.idForm)
                                }
                              />
                            </Card>
                          </Cards>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </DndDiv>
          );
        }}
      </Droppable>
    );
  };

  return (
    <Container>
      <Wrapper>
        <Cards className="Cards">
          <DragDropContext onDragEnd={(result) => onDragEnd(result, cards)}>
            {renderListCards()}
          </DragDropContext>

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
      </Wrapper>
    </Container>
  );
};
export default Board;
