// store/index.ts//yeah store hai
import { configureStore } from "@reduxjs/toolkit";
import parkingReducer from "./parkingSlice";

const store = configureStore({
  reducer: {
    parking: parkingReducer,
  },
});

// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer);

export default store;
