import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  Item,
  Container,
  List,
  Wrapper,
  Card,
  InputForm,
  ControlForm,
  AddCard,
  Cards,
  TextAddCard,
  DeleteIcon,
} from "./styles";

const CreateNewCard = async (e: any) => {
  console.log(e.target);
};

const Board: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Cards>
          <DragDropContext >
          <Card>
            <List>
              <Item component="a">
                1 <DeleteIcon />
              </Item>
              <Item component="a">
                2<DeleteIcon />
              </Item>
              <Item component="a">
                3<DeleteIcon />
              </Item>
              <ControlForm>
                <InputForm
                  id="filled-basic"
                  label="Touch me"
                  variant="filled"
                  autoComplete="off"
                />
              </ControlForm>
            </List>
          </Card>

          <AddCard onClick={CreateNewCard}>
            <List>
              <TextAddCard>Add Card</TextAddCard>
            </List>
          </AddCard>
        </Cards> 
        <DragDropContext />
      </Wrapper>
    </Container>
  );
};
export default Board;
