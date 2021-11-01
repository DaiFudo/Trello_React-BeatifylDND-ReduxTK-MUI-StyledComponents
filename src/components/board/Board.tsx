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
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId && destination.droppableId === "Groups") {
      dispatch(changeCardsPosition({ cards, source, destination }));
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      dispatch(changeOutsideTaskPosition({ cards, source, destination }));
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(changeInsideTaskPosition({ cards, source, destination }));
      return;
    }
  };

  const createCard = (e: EventType) => {
    let cardTitle = e.target.value;
    let btnChecker = e.key;
    if (btnChecker === "Enter" && cardTitle !== "") {
      let idForm, idInput, task;
      dispatch(createCards({ cards, cardTitle, idForm, idInput, task }));
      e.target.value = "";
    }
  };
  const deleteCard = (event: MouseEvent, idForm: string) => {
    dispatch(deleteTargetCard({ idForm }));
  };

  const createTask = (event: EventType, id: string) => {
    const titleTaskInput = event.target.value;

    if (event.key === "Enter" && titleTaskInput !== "") {
      dispatch(сreateTaskInsideCard({ cards, titleTaskInput, id }));
      event.target.value = "";
    }
  };
  const deleteTask = (
    event: MouseEvent,
    id: string,
    cardId: string,
    indexTask: number
  ) => {
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
                          <Cards className="Cards">
                            <Card className="Card" key={item.idForm}>
                              <HeaderCard>
                                <Title>{item.title}</Title>
                                <CloseBtn
                                  onClick={(event) =>
                                    deleteCard(event, item.idForm)
                                  }
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
                                                        onClick={(event) =>
                                                          deleteTask(
                                                            event,
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
