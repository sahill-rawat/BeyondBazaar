import React, { useRef, useEffect, useState, Fragment } from "react";
import { toast } from "react-hot-toast";
import "./payment.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCreditCard, FaCalendarAlt, FaKey } from "react-icons/fa";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";
import MetaData from "../Layout/MetaData";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
// import { createOrder, clearErrors } from '../../actions/orderActions'; // Make sure to import the necessary actions
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/productAction";
import { removeItemsFromCart } from "../../actions/cartAction";

const Payment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
};

  const submitHandler = async (e) => {
    e.preventDefault();

    // payBtn.current.disabled = true;

    // try {
    //   // Your axios post logic here
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const { data } = await axios.post(
    //     "/api/v1/payment/process",
    //     paymentData,
    //     config
    //   );

    //   const client_secret = data.client_secret;

    //   if (!stripe || !elements) return;

    //   const result = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: user.name,
    //         email: user.email,
    //         address: {
    //           line1: shippingInfo.address,
    //           city: shippingInfo.city,
    //           state: shippingInfo.state,
    //           postal_code: shippingInfo.pinCode,
    //           country: shippingInfo.country,
    //         },
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     payBtn.current.disabled = false;
    //     toast.error(result.error.message);
    //   } else {
    //     if (result.paymentIntent.status === "succeeded") {
    //       order.paymentInfo = {
    //         id: result.paymentIntent.id,
    //         status: result.paymentIntent.status,
    //       };

    //         // dispatch(createOrder(order));

    //       // You need to import and use the 'navigate' function from 'react-router-dom'
    //       navigate("/success");
    //     } else {
    //       toast.error("There's some issue while processing payment");
    //     }
    //   }
    // } catch (error) {
    //   payBtn.current.disabled = false;
    //   toast.error(error.response.data.message);
    // }
    cartItems.forEach(item => {
      deleteCartItems(item.product);
  });
    navigate("/success");
  };


  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    //   dispatch(clearErrors());
    // }

  }, [dispatch]);

  return (
    <Fragment>
    <MetaData title="Payment" />
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <h1>Card Info</h1>
        <div>
          <FaCreditCard />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <FaCalendarAlt />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <FaKey />
          <CardCvcElement className="paymentInput" />
        </div>

        <input
          type="submit"
          value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  </Fragment>
  );
};

export default Payment;
