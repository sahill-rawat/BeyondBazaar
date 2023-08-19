import axios from "axios";
import React from "react";
import store from "./store";
import WebFont from "webfontloader";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import { useEffect, useState } from "react";
import Login from "./components/User/Login";
import Search from "./components/Search.jsx";
import Signup from "./components/User/Signup";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Cart/Payment";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile";
import Success from "./components/Cart/Success";
import Products from "./components/Products.jsx";
import Shipping from "./components/Cart/Shipping";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import ProductDetails from "./components/ProductDetails";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import UpdatePassword from "./components/User/UpdatePassword";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripeapikey"
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser()).then(() => {
      getStripeApiKey();
    });
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <Router>
        <Header />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />;
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path='/success' element={<Success/>}/>;
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
