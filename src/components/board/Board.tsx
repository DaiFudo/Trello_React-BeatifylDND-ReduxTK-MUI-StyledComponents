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

const Board: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Cards>
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

          <AddCard>
            <List>
              <TextAddCard>Add Card</TextAddCard>
            </List>
          </AddCard>
        </Cards>
      </Wrapper>
    </Container>
  );
};
export default Board;
