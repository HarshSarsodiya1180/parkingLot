// store/parkingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParkingState {
  spaces: number;
  allocatedSpaces: number[];
  carData: Record<number, { registration: string; startTime: number }>;
}

const initialState: ParkingState = {
  spaces: 0,
  allocatedSpaces: [],
  carData: {},
};

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    setParkingSpaces: (state, action: PayloadAction<number>) => {
      state.spaces = action.payload;
    },
    allocateParkingSpace: (
      state,
      action: PayloadAction<{
        space: number;
        registration: string;
        startTime: number;
      }>
    ) => {
      state.allocatedSpaces.push(action.payload.space);
      state.carData[action.payload.space] = {
        registration: action.payload.registration,
        startTime: action.payload.startTime,
      };
    },
    deallocateParkingSpace: (state, action: PayloadAction<number>) => {
      state.allocatedSpaces = state.allocatedSpaces.filter(
        (space) => space !== action.payload
      );
      delete state.carData[action.payload];
    },
  },
});

export const {
  setParkingSpaces,
  allocateParkingSpace,
  deallocateParkingSpace,
} = parkingSlice.actions;
export default parkingSlice.reducer;
