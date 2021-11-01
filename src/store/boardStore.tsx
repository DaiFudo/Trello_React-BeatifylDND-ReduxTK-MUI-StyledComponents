import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export interface ICard {
  title: string;
  idForm: string;
  idInput: string;
  taskListId: string;
  task: { titleTask: string; id: string }[];
}
interface IItem {
  item: string;
  idForm: string;
}

export const slice = createSlice({
  name: "card",
  initialState: {
    cards: [],
  },
  reducers: {
    // Логика Drag and Drop :3

    // changeCardsPosition - Логика отвечающая за смену позиции конкретной карточки.
    changeCardsPosition: (state, action) => {
      const actionPayload = action.payload;

      let sourceCardSupport = actionPayload.source.index;
      let destCardSupport = actionPayload.destination.index;
      const sourceCard = actionPayload.cards.find(
        (item: IItem, index: number) => index === sourceCardSupport
      );
      const destCard = actionPayload.cards.find(
        (item: IItem, index: number) => index === destCardSupport
      );

      const changePositionCard = actionPayload.cards.map(
        (item: IItem, index: number) => {
          if (item === sourceCard) {
            return {
              ...item,
              ...destCard,
            };
          }
          if (item === destCard) {
            return {
              ...item,
              ...sourceCard,
            };
          }
          return item;
        }
      );

      return void (state.cards = changePositionCard);
    },

    // changeInsideTaskPosition - Логика отвечающая за смену таска в пределах одной карточки.
    changeInsideTaskPosition: (state, action) => {
      const actionPayload = action.payload;
      const card = actionPayload.cards.find(
        (item: IItem) => item.idForm === actionPayload.source.droppableId
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
      const actionPayload = action.payload;
      const sourceCard = state.cards.find(
        (item: IItem) => item.idForm === actionPayload.source.droppableId
      )!;
      const destCard = state.cards.find(
        (item: IItem) => item.idForm === actionPayload.destination.droppableId
      )!;

      // @ts-ignore
      const destTask = [...destCard.task];
      // @ts-ignore
      const sourceTask = [...sourceCard.task];
      const [removed] = sourceTask.splice(actionPayload.source.index, 1);
      destTask.splice(actionPayload.destination.index, 0, removed);

      const allCards = state.cards.map((item: IItem) => {
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

    //Удаление элементов:

    deleteTaskInsideCard: (state, action) => {
      const actionPayload = action.payload;
      const idCard = actionPayload.cardId;
      let allCards: any = [...current(state.cards)];
      const indexTask = actionPayload.indexTask;

      const a = allCards.map((item: any) => {
        if (item.idForm === idCard) {
          const allTasksTargetCard = [...item.task];

          allTasksTargetCard.splice(indexTask, 1);
          const newItem = { ...item, task: allTasksTargetCard };

          return { ...item, task: newItem.task };
        }
        return item;
      });

      return void (state.cards = a);
    },
    deleteTargetCard: (state, action) => {
      const actionPayload = action.payload;
      const idDeletedCard = actionPayload.idForm;
      let allCards: any = [...current(state.cards)];
      allCards.map((item: any, index: number) => {
        if (item.idForm === idDeletedCard) {
          const updateCards = allCards.splice(index, 1);
          return {
            ...item,
            updateCards,
          };
        }
      });
      return void (state.cards = allCards);
    },
  },
});
export const {
  createCards,
  сreateTaskInsideCard,
  changeInsideTaskPosition,
  changeOutsideTaskPosition,
  changeCardsPosition,
  deleteTaskInsideCard,
  deleteTargetCard,
} = slice.actions;

export const cardSelector = (state: any) => state.board.cards;
export default slice.reducer;
