'use client';
import { ProductInterface } from '@/interfaces';
import { CartState, EditProductCart, RemoveProductCart } from '@/redux/cartSlice';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import CheckoutModal from './CheckoutModal';

function Cart() {
  const [showCheckoutModal, setshowCheckoutModal] = useState(false)
  const { cartItems }: CartState = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const total = subtotal + 50; //50 = shipping fee

  return (
    <div className="mt-10">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 text-gray-700 gap-10">
          <div className="col-span-2 flex flex-col gap-5">
            <span className="text-2xl font-semibold">My Cart</span>
            <div className="hidden md:grid grid-cols-7 gap-10">
              <span className="col-span-4">Product</span>
              <span className="col-span-1">Each</span>
              <span className="col-span-1">Quantity</span>
              <span className="col-span-1">Total</span>
            </div>

            <div className="col-span-7 hidden md:block">
              <hr />
            </div>

            {cartItems.map((item: ProductInterface) => (
              <div
                className="grid grid-cols-4 xl:grid-cols-7 items-center xl:gap-10 gap-2"
                key={item.id}
              >
                <div className="col-span-4 flex gap-2 items-center">
                  <Image
                    src={item.images[0].url}
                    alt=""
                    height={80}
                    width={80}
                    className="border p-2 border-gray-300 border-solid hidden xl:block object-scale-down"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm">{item.name}</span>
                    <span
                      className="text-xs underline text-red-700 cursor-pointer"
                      onClick={() => {
                        dispatch(RemoveProductCart(item));
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>

                <span className="col-span-1">$ {item.price}</span>

                <div className="col-span-1 border border-solid p-2 border-gray-400 flex gap-2 justify-between">
                  <i
                    className="ri-subtract-line"
                    onClick={() => {
                      dispatch(
                        EditProductCart({
                          ...item,
                          quantity: item.quantity - 1,
                        })
                      );
                    }}
                  ></i>
                  <span>{item.quantity}</span>
                  <i
                    className="ri-add-line"
                    onClick={() => {
                      dispatch(
                        EditProductCart({
                          ...item,
                          quantity: item.quantity + 1,
                        })
                      );
                    }}
                  ></i>
                </div>

                <span className="col-span-1">
                  $ {item.price * item.quantity}
                </span>

                <div className="xl:hidden block col-span-4">
                  <hr className="border border-gray-400 border-dotted" />
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1 border border-gray-400 border-solid p-5">
            <h1 className="text-xl font-semibold">Amount Summary</h1>
            <hr className="border border-gray-400 border-dashed" />
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ${' '}
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>$ 50</span>
              </div>

              <hr className="border border-gray-200 border-dashed" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$ {total}</span>
              </div>

              <Button
                block
                type="primary"
                className="mt-10"
                onClick={() => {
                  setshowCheckoutModal(true);
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 text-gray-700">
          <i className="ri-shopping-cart-line text-6xl"></i>
          <h1 className="text-sm">Your cart is empty</h1>
        </div>
      )}

      {showCheckoutModal && (
        <CheckoutModal
          setShowCheckoutModal={setshowCheckoutModal}
          showCheckoutModal={showCheckoutModal}
          total={total}
        />
      )}
    </div>
  );
}

export default Cart;
