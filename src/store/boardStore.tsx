import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        title: "",
        idForm: "",
        idInput: "",
        task: [{ titleTask: "", id: "" }],
      },
    ],
  },
  reducers: {
    /* changeCards: (state, payload) => {
            const a = cards.findIndex(item => item.id === payload.id)
            cards.splice();
            const a = cards.findIndex(item => item.id === payload.idNew)

        }, */
    changeInsideTaskPosition: (state, action: PayloadAction<TTypes>) => {
      const actionPayload = action.payload;
      const card = actionPayload.cards.find(
        (item: any) => item.idForm === actionPayload.source.droppableId
      );
      console.log(1, card);

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
      console.log(2, mappedCards);

      //setCards(mappedCards);
      state.cards = mappedCards;
      // return mappedCards;
    },
  },
});
export const { changeInsideTaskPosition } = slice.actions;

export const boardSelector = (state: any) => state.board; //мб тут .value нужно или аналоги

export default slice.reducer;
