'use client';
import { ProductInterface } from "@/interfaces";
import { AddProductToCart, CartState } from "@/redux/cartSlice";
import { Button, message } from "antd";
import Reac from "react";
import { useDispatch, useSelector } from "react-redux";
function AddToCartBtn({product} : { product: ProductInterface }){
  const { cartItems }: CartState = useSelector((state: any) => state.cart);

    const dispatch = useDispatch()

    return(
        <div>
          <Button
              type="primary"
              onClick={() => {
                dispatch(
                  AddProductToCart({
                    ...product,
                    quantity: 1
                  })
                );
                message.success('Added to cart');
              }}

              disabled={
                cartItems.some((item: ProductInterface) => item.id === product.id)
              }
            >
              Add Cart
            </Button>
        </div>
    )
}

export default AddToCartBtn;