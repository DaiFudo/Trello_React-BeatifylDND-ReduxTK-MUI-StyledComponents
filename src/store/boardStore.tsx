import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
interface ICard {
  title: string;
  idForm: string;
  idInput: string;
  taskListId: string;
  task: { titleTask: string; id: string }[];
}
type TTypes = {
  cards: any;
  source: any;
  destination: any;
};

export const slice = createSlice({
  name: "card",
  initialState: {
    cards: [],
  },
  reducers: {
    // Логика Drag and Drop :3

    // changeCardsPosition - Логика отвечающая за смену позиции конкретной карточки.
    changeCardsPosition: (state, action) => {
      console.log("hi");
      const actionPayload = action.payload;

      const sourceCard = actionPayload.source.index;
      const destCard = actionPayload.destination.index;

      console.log(sourceCard);
      console.log(destCard);
      const changePositionCard = actionPayload.cards.map(
        (item: any, index: number) => {
          if (index === sourceCard) {
            return sourceCard.splice(
              actionPayload.destination.index,
              0,
              removed
            );
          }
          if (index === destCard) {
            return { ...item };
          }
          return { ...item };
        }
      );
      console.log("changePositionCard", changePositionCard);
      return void (state.cards = changePositionCard);
    },

    // changeInsideTaskPosition - Логика отвечающая за смену таска в пределах одной карточки.
    changeInsideTaskPosition: (state, action: PayloadAction<TTypes>) => {
      const actionPayload = action.payload;
      const card = actionPayload.cards.find(
        (item: any) => item.idForm === actionPayload.source.droppableId
      );

      const copiedItems = [...card.task];
      const [removed] = copiedItems.splice(actionPayload.source.index, 1);
      copiedItems.splice(actionPayload.destination.index, 0, removed);
      const mappedCards = actionPayload.cards.map((item: ICard) => {
        if (item.idForm === actionPayload.source.droppableId) {
          return {
            ...item,
            task: copiedItems,
          };
        }
        return item;
      });
      return void (state.cards = mappedCards);
    },
    // changeOutsideTaskPosition - Логика отвечающая за перекидывание таска во всех карточках.
    changeOutsideTaskPosition: (state, action) => {
      console.log("hi", "changeOutsideTaskPosition");
      //if( )
      const actionPayload = action.payload;
      const sourceCard = state.cards.find(
        (item: any) => item.idForm === actionPayload.source.droppableId
      )!;
      const destCard = state.cards.find(
        (item: any) => item.idForm === actionPayload.destination.droppableId
      )!;

      console.log("destCard", destCard, actionPayload.destination);

      // @ts-ignore
      const destTask = [...destCard.task];
      console.log("destTask", destTask);
      // @ts-ignore
      const sourceTask = [...sourceCard.task];
      const [removed] = sourceTask.splice(actionPayload.source.index, 1);
      console.log(sourceTask);
      destTask.splice(actionPayload.destination.index, 0, removed);

      const allCards = state.cards.map((item: any) => {
        if (item === sourceCard) {
          return {
            ...item,
            task: sourceTask,
          };
        }
        if (item === destCard) {
          return {
            ...item,
            task: destTask,
          };
        }
        return item;
      });
      return void (state.cards = allCards as any);
    },

    //Логика создания карточки
    createCards: (state, action) => {
      let actionPayload = action.payload;

      let id = uuidv4();
      let idTaskList = uuidv4();

      let createCard: any = [
        ...actionPayload.cards,
        {
          title: actionPayload.cardTitle,
          idForm: id,
          idInput: id,
          task: [],
          idTaskList,
        },
      ];
      return void (state.cards = createCard);
    },

    // сreateTaskInsideCard - Логика отвечающая за создание таска в карточке.
    сreateTaskInsideCard: (state, action) => {
      const actionPayload = action.payload;
      let id = uuidv4();
      const mappedCards = actionPayload.cards.map((item: ICard) => {
        if (item.idForm === actionPayload.id) {
          return {
            ...item,
            task: [
              ...item.task,
              { titleTask: actionPayload.titleTaskInput, id },
            ],
          };
        }
        return item;
      });
      return void (state.cards = mappedCards);
    },
  },
});
export const {
  createCards,
  сreateTaskInsideCard,
  changeInsideTaskPosition,
  changeOutsideTaskPosition,
  changeCardsPosition,
} = slice.actions;

export const cardSelector = (state: any) => state.board.cards;
export default slice.reducer;
