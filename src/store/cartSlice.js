import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef initialStateType
 * @property {Array<{
 *
 *     "productId": number,
 *     "name": string,
 *     "description": string,
 *     "price": number,
 *     "stock": number,
 *     "categoryId": number,
 *     "quantity": number
 * }>} products
 */
/**
 * @type {initialStateType}
 */
const initialState = { products: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const index = state.products.findIndex(
        (element) => element.productId === payload.productId
      );
      if (index >= 0) {
        state.products.at(index).quantity += 1;
      } else {
        state.products.push({ ...payload, quantity: 1 });
      }
    },

    removeToCart(state, { payload }) {
      const index = state.products.findIndex(
        (element) => element.productId === payload.productId
      );
      if (index >= 0) {
        const quantityItem = state.products.at(index).quantity;
        if (quantityItem - 1 >= 1) {
          state.products.at(index).quantity -= 1;
        } else {
          state.products = state.products.filter(
            (element) => element.productId !== payload.productId
          );
        }
      }
    },
    
    removeItemFromCart(state, { payload }) {
      state.products = state.products.filter(
        (product) => product.productId !== payload.productId
      );
    },

    clearShoppingCart(state) {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeToCart,
  removeItemFromCart,
  clearShoppingCart,
} = cartSlice.actions;
