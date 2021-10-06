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
  task: { name: string; key: string }[];
  items: any;
}
/* interface IResDrag {
  result: any;
  cards: any;
  setBoards: any;
} */

const Board: React.FC = () => {
  uuidv4();
  const [cards, setCards] = useState<ICard[]>([]);

  // drag and drop
  const onDragEnd = (result: any, cards: any, setCards: any) => {
    if (!result.destination) return console.log("Возврат на прежнее место.");
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      console.log("hz");

      const sourceCard = cards[source.droppableId];
      const destCard = cards[destination.droppableId];
      const sourceItems = [...sourceCard.items];
      const destItems = [...destCard.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
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
      });
    } else {
      console.log("hi1");

      const card = cards[source.droppableId];
      console.log(typeof cards.items);
      const copiedItems = [...card.items];
      console.log("hi3");
      const [removed] = copiedItems.splice(source.index, 1);
      console.log("hi4");
      copiedItems.splice(destination.index, 0, removed);
      console.log("hi5");
      setCards({
        ...cards,
        [source.droppableId]: {
          ...card,
          items: copiedItems,
        },
      });
    }
  };

  //

  const createBoard = async (e: EventType) => {
    let boardTitle = e.target.value;
    if (e.key === "Enter" && boardTitle !== "") {
      const id = uuidv4();
      console.log(cards);

      setCards([
        ...cards,
        {
          title: boardTitle,
          idForm: id,
          idInput: id,
          task: [],
          items: {},
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
            item.task.push({ name: newTask, key: uuidv4() });
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
      console.log(item);

      return (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, cards, setCards)}
        >
          <Card key={item.idForm}>
            <Title>{item.title}</Title>
            <List>
              <Droppable droppableId={item.idForm} key={item.idForm}>
                {(provided) => {
                  return (
                    <div
                      className="another div"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {item.task.map((task, index) => {
                        return (
                          <Draggable
                            key={task.key}
                            draggableId={task.key}
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
