import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      pizzaId: 1,
      name: "Pizza Napoletana",
      quantity: 2,
      unitPrice: 12,
      totalPrice: 24,
    },
    {
      pizzaId: 2,
      name: "Pizza Margherita",
      quantity: 1,
      unitPrice: 10,
      totalPrice: 10,
    },
    {
      pizzaId: 3,
      name: "Pizza Diavola",
      quantity: 3,
      unitPrice: 14,
      totalPrice: 42,
    },
  ],

  // Example of an item in the cart
  // {
  //   pizzaId: 1,
  //   name: "Margherita",
  //   quantity: 2,
  //   unitPrice: 10,
  //   totalPrice: 20,
  // },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.items.find((item) => item.pizzaId === action.payload.pizzaId)) {
        return;
      }
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    deleteItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.pizzaId !== itemIdToRemove
      );
    },

    increaseItemQuantity: (state, action) => {
      const item = state.items.find((item) => item.pizzaId === action.payload);
      if (item) {
        if (item.quantity >= 10) return;
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.items.find((item) => item.pizzaId === action.payload);
      if (item) {
        if (item.quantity <= 1) return;
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
  },
});

export const {
  addItem,
  clearCart,
  deleteItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);

export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectCartItemById = (state, pizzaId) =>
  state.cart.items.find((item) => item.pizzaId === pizzaId);

export const selectCartItemQuantityById = (state, pizzaId) => {
  const item = state.cart.items.find((item) => item.pizzaId === pizzaId);
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;
