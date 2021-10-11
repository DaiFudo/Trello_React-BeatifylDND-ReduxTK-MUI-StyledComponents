import React, { useState } from "react";
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
  task: { name: string; id: string }[];
}

const Board: React.FC = () => {
  uuidv4();
  const [cards, setCards] = useState<ICard[]>([]);

  // drag and drop
  const onDragEnd = (result: any, cards: any, setCards: any) => {
    if (!result.destination) return console.log("back"); // Возврат элемента назад, если вышел за рамки.
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      changeCards();
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

      console.log(1, sourceCard);
      console.log(2, destCard);
      console.log(3, sourceTask);
      console.log(4, destTask);
      console.log(5, removed);

      const changeTasks = cards.map((item: any) => {
        destTask.find((item: any) => item.task === destination.task);
        console.log(111, destTask);
        console.log(10, removed);
        console.log(11, sourceCard);
        if (removed === destTask) {
          console.log("fuck off", removed, destTask);
        }
        return item;
      });
      changeTasks();

      /* setCards({
        ...cards,
        task: sourceCard,
      }); */
    } else {
      // Перебрасывание тасков в рамках одной доски.
      const card = cards.find(
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
      setCards(mappedCards);
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
            item.task.push({ name: newTask, id: uuidv4() });
            e.target.value = "";
          }
          return item;
        })
      );
    }
  };

  const renderListCards = () => {
    console.log(cards);
    return cards.map((item) => {
      return (
        <Cards className="all cards">
          <Card className="here" key={item.idForm}>
            <Title>{item.title}</Title>
            <List>
              <Droppable droppableId={item.idForm} key={item.idForm}>
                {(provided) => {
                  return (
                    <div
                      className="anotherDiv"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {item.task.map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  className="anotherDiv2"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Item component="a">
                                    {task.name} <DeleteIcon />
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
