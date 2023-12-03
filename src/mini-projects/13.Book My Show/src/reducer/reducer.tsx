/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";
import { seatArrangement } from "../model/data";
import { ISeatArrangement } from "../model/model";
import { ISeatProps } from "../Component/Seat";

interface SeatStore extends ISeatArrangement {
  selected: {
    seatList: ISeatProps[];
    totalPrice: number;
  };
}

// Define the initial state
const initialState: SeatStore = {
  categories: seatArrangement.categories,
  selected: {
    seatList: [],
    totalPrice: 0,
  }, // Replace this with your initial category structure
};

// Create the context
const SeatContext = createContext<{
  state: SeatStore;
  dispatch: React.Dispatch<unknown>;
}>({ state: initialState, dispatch: () => null });

// Define the reducer function
function seatReducer(state: SeatStore, action: any) {
  switch (action.type) {
    case "toggle":
      const { seat: addedSeat } = action;
      const seatIndx = state.selected.seatList.findIndex(
        (seat) => seat.id === addedSeat.id
      );
      let newSelectedSeat: ISeatProps[] = [];
      if (seatIndx !== -1) {
        newSelectedSeat = state.selected.seatList.filter(
          ({ id }) => id !== addedSeat.id
        );
      } else {
        newSelectedSeat = [...state.selected.seatList, addedSeat];
      }

      const totalPrice = newSelectedSeat.reduce(
        (total, seat) => total + seat.price,
        0
      );
      return {
        ...state,
        selected: { seatList: newSelectedSeat, totalPrice },
      };
    // Add cases to handle different actions if needed
    default:
      return state;
  }
}

// Create the SeatProvider component
export function SeatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(seatReducer, initialState);

  return (
    <SeatContext.Provider value={{ state, dispatch }}>
      {children}
    </SeatContext.Provider>
  );
}

export function UseSeats() {
  const context = useContext(SeatContext);
  if (context === undefined) {
    throw new Error(`UseSeats must be used within a SeatProvider`);
  }
  return context;
}
