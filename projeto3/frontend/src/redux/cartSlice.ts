import { ProductInterface } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cartItems: ProductInterface[];
  cartTotal: number;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotal: 0,
  } as CartState,
  reducers: {
    AddProductToCart: (
      state,
      action: {
        type: string;
        payload: ProductInterface;
      }
    ) => {
      state.cartItems.push(action.payload);
    },

    RemoveProductCart: (
      state,
      action: {
        type: string;
        payload: ProductInterface;
      }
    ) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id != action.payload.id
      );
    },

    EditProductCart: (
      state,
      action: {
        type: string;
        payload: ProductInterface;
      }
    ) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    ClearCart: (state) => {
      state.cartItems = []
    }

  },
});

export const {
  AddProductToCart,
  RemoveProductCart,
  EditProductCart,
  ClearCart,
} = cartSlice.actions;
