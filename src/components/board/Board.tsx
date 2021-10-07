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
    if (!result.destination) return console.log("Возврат на прежнее место.");

    const { source, destination } = result;
    console.log(source);

    if (source.droppableId !== destination.droppableId) {
      // const sourceCard = cards[source.droppableId];
      const sourceCard = cards.find(
        (item: any) => item.idForm === source.droppableId
      );
      const destCard = cards[destination.droppableId];
      const sourceTask = [...sourceCard.task];
      const destTask = [...destCard.task];
      const [removed] = sourceTask.splice(source.index, 1);
      destTask.splice(destination.index, 0, removed);
      // нужно сравнить все что в примере по логу и по аналогии засетать информацию в карты тут
      /* {
        ...sourceCard,
        task: [...sourceCard.task, new Task]
      }
      setCards({
        ...cards,
        [source.droppableId]: {
          ...sourceCard,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCard,
          items: destItems,
        },
      }); */
    } else {
      // const card = cards[source.droppableId];
      // console.log(cards);
      const card = cards.find(
        (item: any) => item.idForm === source.droppableId
      );
      const copiedItems = [...card.task];
      /* console.log("копируем таск в: ", copiedItems); */

      const [removed] = copiedItems.splice(source.index, 1);
      /* console.log("забераем нужный элем: ", removed); */

      copiedItems.splice(destination.index, 0, removed);
      /* console.log("вставляем нужный элем: ", copiedItems); */

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
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, cards, setCards)}
        >
          <Card className="here" key={item.idForm}>
            <Title>{item.title}</Title>
            <List>
              <Droppable droppableId={item.idForm} key={item.idForm}>
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
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
            {renderInputForTask()}
          </Card>
        </DragDropContext>
      );
    });
  };

  return (
    <Container>
      <Wrapper>
        <Cards className="all cards">
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
