import { Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '@/constants';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51OJmaAIpfRYgyft7duTPhwUCigrpjZCBB8DfBE1kv3WO82SkpzRlFZwjPjQQpp3LtozTbOdFdYsX8plq8rDNmKKo00gS1sf5RE'
);

interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: any;
  total: number;
}

function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  total,
}: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setclientSecret] = useState("");

const loadingClientSecret = async () => {
  try {
    setLoading(true)
    const { data } = await axios.post(`${API_URL}/payment`, {
      amount: total,
      currency: 'usd',
    });
    setclientSecret(data);
  } catch (error: any) {
    notification.error({
      message: 'Error on loadClient',
      description: error.message,
    })
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadingClientSecret();
}, []);


  return (
    <Modal
      title={
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Checkout</span>
          <span>Total: ${total}</span>
        </div>
      }
      open={showCheckoutModal}
      onCancel={() => setShowCheckoutModal(false)}
      centered
      closable={false}
      footer={false}
    >
      <hr className="my-5"/>
      <div className="mt-5">
        { stripePromise && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{clientSecret: clientSecret}}
          >
            <CheckoutForm
              total={total}
              setShowCheckoutmodal={ setShowCheckoutModal }
            >

            </CheckoutForm>
          </Elements>
        )}
      </div>
    </Modal>
  );
}

export default CheckoutModal