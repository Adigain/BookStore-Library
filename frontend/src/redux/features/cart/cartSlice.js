import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item has been added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "<strong>Item already added in cart</strong>",
          icon: "info",
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: `
                  <i class="fa fa-thumbs-up"></i> Great!
                `,
          confirmButtonAriaLabel: "Thumbs up, great!",
          cancelButtonText: `
                  <i class="fa fa-thumbs-down"></i>
                `,
          cancelButtonAriaLabel: "Thumbs down",
        });
      }
    },
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
    },
    clearCart: (state) => {
        state.cartItems = []
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
