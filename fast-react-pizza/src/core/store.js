import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";

// const loadStateFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("fast-pizza-state");
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return err;
//   }
// };

// const saveStateToLocalStorage = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("fast-pizza-state", serializedState);
//   } catch (err) {
//     console.error("Error saving state to localStorage:", err);
//   }
// };

// const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  // preloadedState,
});

// store.subscribe(() => {
//   saveStateToLocalStorage(store.getState());
// });

export default store;
