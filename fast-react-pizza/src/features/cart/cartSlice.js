import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  totalQuantity: 0,
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
      state.total += action.payload.totalPrice;
      state.totalQuantity += action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalQuantity = 0;
    },
    deleteItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.pizzaId !== itemIdToRemove
      );
      // Recalculate totals after removing an item
      state.total = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    updateItemQuantity: (state, action) => {
      const { pizzaid: itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.pizzaId === itemId);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.unitPrice * quantity;
      }
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
  updateItemQuantity,
  calculateTotal,
  calculateTotalquantity,
  decreaseItemQuantity,
  increaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
