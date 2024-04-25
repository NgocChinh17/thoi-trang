import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { id, quantity } = action.payload;
      const existProductIndex = state.cartList.findIndex((item) => item.id === id);
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity =
          state.cartList[existProductIndex].quantity + quantity;
      } else {
        state.cartList.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cartList));
      }
    },
    updateFormCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existProductIndex = state.cartList.findIndex((item) => item.productId === productId);
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartList));
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cartList = state.cartList.filter((item) => item.productId !== productId);
      localStorage.removeItem("cart", JSON.stringify(state.cart));
    },
    clearCartRequest: (state) => {
      state.cartList = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCartRequest, removeFromCart, updateFormCart, clearCartRequest } =
  cartSlice.actions;

export default cartSlice.reducer;
