import React, { MouseEvent } from "react";

import {
  changeCardsPosition,
  changeOutsideTaskPosition,
  changeInsideTaskPosition,
  сreateTaskInsideCard,
  cardSelector,
  createCards,
  deleteTaskInsideCard,
  deleteTargetCard,
  ICard,
} from "../../store/boardStore";

import { useSelector, useDispatch } from "react-redux";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

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
  CloseBtn,
  HeaderCard,
} from "./style";

type EventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const Board: React.FC = () => {
  const cards = useSelector(cardSelector);
  const dispatch = useDispatch();

  // drag and drop
  const onDragEnd = (result: DropResult, cards: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId && destination.droppableId === "Groups") {
      dispatch(changeCardsPosition({ cards, source, destination }));
      console.log("wtf?");

      return;
    }
    if (source.droppableId !== destination.droppableId) {
      dispatch(changeOutsideTaskPosition({ cards, source, destination }));
      return;
    }
    dispatch(changeInsideTaskPosition({ cards, source, destination }));
  };

  const createCard = (event: EventType) => {
    let cardTitle = event.target.value;
    let btnChecker = event.key;
    if (btnChecker === "Enter" && cardTitle !== "") {
      dispatch(createCards({ cards, cardTitle }));
      event.target.value = "";
    }
  };
  const deleteCard = (idForm: string) => {
    dispatch(deleteTargetCard({ idForm }));
  };

  const createTask = (event: EventType, id: string) => {
    const titleTask = event.target.value;

    if (event.key === "Enter" && titleTask !== "") {
      dispatch(сreateTaskInsideCard({ cards, titleTask, id }));
      event.target.value = "";
    }
  };
  const deleteTask = (id: string, cardId: string, indexTask: number) => {
    dispatch(deleteTaskInsideCard({ cards, id, cardId, indexTask }));
  };

  const renderListCards = () => {
    return (
      <Droppable direction="horizontal" droppableId={`Groups`} type="COLUMN">
        {(provided) => {
          return (
            <DndDiv {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((item: ICard, indexCard: number) => {
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
                          <Cards>
                            <Card>
                              <HeaderCard>
                                <Title>{item.title}</Title>
                                <CloseBtn
                                  onClick={() => deleteCard(item.idForm)}
                                />
                              </HeaderCard>

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
                                                      <DeleteIcon
                                                        onClick={() =>
                                                          deleteTask(
                                                            task.id,
                                                            item.idForm,
                                                            indexTask
                                                          )
                                                        }
                                                      />
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
                                id="filled-basic"
                                label="New task"
                                variant="filled"
                                autoComplete="off"
                                onKeyDown={(event: EventType) =>
                                  createTask(event, item.idForm)
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
        <Cards>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, cards)}>
            {renderListCards()}
          </DragDropContext>
          <AddCard>
            <List>
              <TextAddCard>Add Card</TextAddCard>
            </List>
            <InputForm
              autoComplete="off"
              onKeyDown={(event: EventType) => createCard(event)}
            />
          </AddCard>
        </Cards>
      </Wrapper>
    </Container>
  );
};
export default Board;
