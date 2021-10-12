import React, { useState } from "react";

import {
  changeInsideTaskPosition,
  boardSelector,
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

interface ICard {
  title: string;
  idForm: string;
  idInput: string;
  task: { titleTask: string; id: string }[];
}

const Board: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  const count = useSelector(boardSelector);
  console.log(123, count.cards);

  const dispatch = useDispatch();

  // drag and drop
  const onDragEnd = (result: any, cards: any, setCards: any) => {
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

      /* setCards({
        ...cards,
        task: sourceCard,
      }); */
    } else {
      dispatch(changeInsideTaskPosition({ cards, source, destination }));
      // Перебрасывание тасков в рамках одной доски.
      /* const card = cards.find(
        (item: any) => item.idForm === source.droppableId
      );
      const copiedItems = [...card.task];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const mappedCards = cards.map((card: ICard) => {
        if (card.idForm === source.droppableId) {
          return {
            ...card,
            task: copiedItems,
          };
        }
        return card;
      });
      setCards(mappedCards);*/
    }
  };

  //

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
            item.task.push({ titleTask: newTask, id: uuidv4() });
            e.target.value = "";
          }
          return item;
        })
      );
    }
  };

  const renderListCards = () => {
    return count.cards.map((item: any) => {
      console.log(123, item);

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
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, cards, setCards)}
        >
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
        </DragDropContext>
      </Wrapper>
    </Container>
  );
};
export default Board;
