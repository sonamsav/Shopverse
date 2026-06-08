import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    cart: [],
    address: [],
    selectedAddress: null,
  },

  reducers: {
    // Products
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    // Cart
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    // Address
    addAddress: (state, action) => {
          console.log("Address received:", action.payload);

      state.address.push(action.payload);
        console.log("Current addresses:", state.address);

    },

    // Select Address
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    // Delete Address
    deleteAddress: (state, action) => {
      state.address = state.address.filter(
        (_, index) => index !== action.payload
      );

      // Reset selected address if deleted
      if (state.selectedAddress === action.payload) {
        state.selectedAddress = null;
      }
    },
  },
});

export const {
  setProducts,
  setCart,
  addAddress,
  setSelectedAddress,
  deleteAddress,
} = productSlice.actions;

export default productSlice.reducer;