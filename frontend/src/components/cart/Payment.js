import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {

  useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import axios from "axios";

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}



const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);


 const navigate = useNavigate()
  useEffect(() => {}, []);

    
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const paymentData = {
      amount : orderInfo.totalPrice 
    }
    
    const submitHandler = async(e) => {
        e.preventDefault()
      

        let res;
        try {
            
            res = await axios.post("/api/v1/process/payment", paymentData, { headers: { "Content-Type": "application/json" } })
            const clientSecret = res.data.client_secret;
            if (!stripe || elements) return
            
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                toast.error(result.error.errorMessage);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    // order.paymentInfo = {
                    //     id: result.paymentIntent.id,
                    //     status: result.paymentIntent.status
                    // }

                    // dispatch(createOrder(order))

                    navigate('/success')
                } else {
                    toast.error('There is some issue while payment processing')
                }
            }
        }
        catch (error) {
            document.querySelector("#pay_btn").disabled = true
            toast.error(error)
        }
    }
    
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                              className="form-control"
                              options={options}

              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                              className="form-control"
                              options={options}
       
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                              className="form-control"
                              options={options}
       
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {`- ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
