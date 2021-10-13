import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
interface ICard {
  title: string;
  idForm: string;
  idInput: string;
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
    cards: [
      {
        title: "12",
        idForm: "44",
        idInput: "66",
        task: [
          { titleTask: "77", id: "9" },
          { titleTask: "123", id: "1119" },
        ],
      },
    ],
  },
  reducers: {
    // Логика Drag and Drop :3
    // changeInsideTaskPosition - Логика отвечающая за смену таска в пределах одной карточки.
    changeInsideTaskPosition: (state, action: PayloadAction<TTypes>) => {
      const actionPayload = action.payload;
      const card = actionPayload.cards.find(
        (item: any) => item.idForm === actionPayload.source.droppableId
      );

      const copiedItems = [...card.task];
      const [removed] = copiedItems.splice(actionPayload.source.index, 1);
      copiedItems.splice(actionPayload.destination.index, 0, removed);
      const mappedCards = actionPayload.cards.map((card: ICard) => {
        if (card.idForm === actionPayload.source.droppableId) {
          return {
            ...card,
            task: copiedItems,
          };
        }
        return card;
      });
      return void (state.cards = mappedCards);
    },

    //Логика создания карточки
    createCards: (state, action) => {
      let actionPayload = action.payload;

      let id = uuidv4();
      let createCard = [
        ...actionPayload.cards,
        {
          title: actionPayload.cardTitle,
          idForm: id,
          idInput: id,
          task: [],
        },
      ];

      // actionPayload.cards.push({
      //   title: actionPayload.cardTitle, пример того как меня унизил js, хорошо что я люблю страдать.
      //   idForm: uuidv4(),
      //   idInput: uuidv4(),
      //   task: [{}],
      // });
      return void (state.cards = createCard);
    },

    сreateTaskInsideCard: (state, action) => {
      const actionPayload = action.payload;
      console.log("newTask from boardStore", actionPayload.newTask);
    },
  },
});
export const { createCards, сreateTaskInsideCard, changeInsideTaskPosition } =
  slice.actions;

export const cardSelector = (state: any) => state.board.cards;

export default slice.reducer;
