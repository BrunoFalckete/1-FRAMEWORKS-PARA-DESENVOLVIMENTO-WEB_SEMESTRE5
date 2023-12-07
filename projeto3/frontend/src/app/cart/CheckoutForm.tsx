'use cliente'
import { CartState, ClearCart } from '@/redux/cartSlice';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, notification } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function CheckoutForm({
  total,
  setShowCheckoutmodal
} : {
  total: number;
  setShowCheckoutmodal: any;
}) {

  const [loading, setLoading] = useState(false);
  const elements = useElements()
  const stripe = useStripe()
  const { cartItems }: CartState = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true)
      event.preventDefault();

      if (!stripe || !elements) throw new Error("Stripe.js hasn't loaded yet.");

        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: 'http://localhost:300/cart',
          },
          redirect: 'if_required'
        });

        if (result.error) {
          throw result.error
        }

        notification.success({
          message: "Payment sucessful",
          description: "Your paymente was processed succesfully"
        })

        const userId = '123'

        const orderPayload = {
          user: userId,
          items: cartItems,
          paymentStatus: "paid",
          orderStatus: "order placed",
          shippingAdress: result.paymentIntent.shipping,
          transationId: result.paymentIntent.id,
          total
        }

        // save data to backend

        dispatch(ClearCart())

        notification.success({
          message: "Order placed sucessful",
          description: "Your order was placed succesfully"
        })

    } catch (error: any) {
        notification.error({
          message: "Payment failed",
          description: error.message
        })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="h-[350px] overflow-y-scroll pr-5">
          <PaymentElement />
          <AddressElement
            options={{
              allowedCountries: ['US, BR'],
              mode: 'shipping',
            }}
          />
        </div>
        <div className="flex gap-5">
          <Button
            htmlType='button'
            className='mt-5'
            block
            onClick={() => setShowCheckoutmodal(false)}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            className='mt-5'
            block
          >
            Pay
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm