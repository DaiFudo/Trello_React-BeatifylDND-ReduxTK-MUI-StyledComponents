import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

import Container from "../UI/Container/Container";
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

type EventType = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

interface ICard {
  title: string;
  idForm: string;
  idInput: string;
  task: { name: string; key: string }[];
}
/* interface IResDrag {
  result: any;
  boards: any;
  setBoards: any;
} */

const Board: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  // drag and drop
  const onDragEnd = (result: any, boards: any, setBoards: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceBoard = boards[source.droppableId];
      const destBoard = boards[destination.droppableId];
      const sourceItems = [...sourceBoard.items];
      const destItems = [...destBoard.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setCards({
        ...boards,
        [source.droppableId]: {
          ...sourceBoard,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destBoard,
          items: destItems,
        },
      });
    } else {
      const board = boards[source.droppableId];
      const copiedItems = [...board.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setCards({
        ...boards,
        [source.droppableId]: {
          ...board,
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
              <Droppable droppableId={item.idForm}>
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {item.task.map((task, index) => {
                        return (
                          <Draggable
                            key={task.key}
                            draggableId={task.key}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {task.name}
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
