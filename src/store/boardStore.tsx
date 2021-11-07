import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export interface ICard {
  task: any;
  title: string;
  id: string;
  taskListId: string;
}
interface ITask {
  title: string;
  id: string;
}
interface IMapItem {
  // изменить на mapitems
  item: string;
  idForm: string;
  task: [];
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
      let allCards: any = [...current(state.cards)];
      let sourceCardSupport = actionPayload.source.index; // handler а не support.
      let destCardSupport = actionPayload.destination.index;
      const sourceCard = allCards.find(
        (index: number) => index === sourceCardSupport
      );
      const destCard = allCards.find(
        (index: number) => index === destCardSupport
      );

      const changePositionCard = allCards.map((item: IMapItem) => {
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
      });

      return void (state.cards = changePositionCard);
    },

    // changeInsideTaskPosition - Логика отвечающая за смену таска в пределах одной карточки.
    changeInsideTaskPosition: (state, action) => {
      const actionPayload = action.payload;
      let allCards: any = [...current(state.cards)];
      const card = allCards.find(
        (item: IMapItem) => item.idForm === actionPayload.source.droppableId
      );

      const copiedItems = [...card.task];
      const [removed] = copiedItems.splice(actionPayload.source.index, 1); // можно просто index[0].
      copiedItems.splice(actionPayload.destination.index, 0, removed);
      const mappedCards = actionPayload.cards.map((item: ICard) => {
        if (item.id === actionPayload.source.droppableId) {
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
      let allCards: any = [...current(state.cards)];
      const sourceCard = allCards.find(
        (item: IMapItem) => item.idForm === actionPayload.source.droppableId
      )!;
      const destCard = allCards.find(
        (item: IMapItem) =>
          item.idForm === actionPayload.destination.droppableId
      )!;

      const destTask = [...destCard.task];
      const sourceTasks = [...sourceCard.task];
      const [removed] = sourceTasks.splice(actionPayload.source.index, 1);
      destTask.splice(actionPayload.destination.index, 0, removed);

      allCards.map((item: IMapItem) => {
        // перебор сделать проще поиск по индексу
        if (item === sourceCard) {
          // странная проверка
          return {
            ...item,
            task: sourceTasks,
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
      return void (state.cards = allCards);
    },

    //Логика создания карточки
    createCards: (state, action) => {
      let actionPayload = action.payload;

      let id = uuidv4();

      let createCards: any = [
        // ANY
        ...actionPayload.cards,
        {
          title: actionPayload.cardTitle,
          idForm: id,
          task: [],
        },
      ];
      return void (state.cards = createCards);
    },

    // сreateTaskInsideCard - Логика отвечающая за создание таска в карточке.
    сreateTaskInsideCard: (state, action) => {
      const actionPayload = action.payload;
      let id = uuidv4();
      let allCards: any = [...current(state.cards)]; // ANY
      const mappedCards = allCards.map((item: ICard) => {
        if (item.id === actionPayload.id) {
          return {
            ...item,
            task: [...item.task, { titleTask: actionPayload.titleTask, id }],
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
      let allCards: any = [...current(state.cards)]; // ANY
      const indexTask = actionPayload.indexTask;

      const mappedCards = allCards.map((item: IMapItem) => {
        // any,
        if (item.idForm === idCard) {
          const allTasksTargetCard = [...item.task];

          allTasksTargetCard.splice(indexTask, 1);
          const newItem = { ...item, task: allTasksTargetCard };

          return { ...item, task: newItem.task };
        }
        return item;
      });

      return void (state.cards = mappedCards);
    },
    deleteTargetCard: (state, action) => {
      const actionPayload = action.payload;
      const idDeletedCard = actionPayload.idForm;
      let allCards: any = [...current(state.cards)]; // ANY
      allCards.map((item: ICard, index: number) => {
        if (item.id === idDeletedCard) {
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

export const cardSelector = (state: any) => state.board.cards; // ANY, это состояние хранилища стора, которое не меняется.
export default slice.reducer;
