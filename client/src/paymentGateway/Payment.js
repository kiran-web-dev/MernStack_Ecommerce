import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "../core/helper/cartHelper";
import { getmeToken, processPayment } from "./paymentHelper";
import { createOrder } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((response) => {
      //console.log("INFO", response);
      if (response.error) {
        setInfo({ ...info, error: response.error });
      } else {
        const clientToken = response.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 && (
          <div>
            <h3>Your bill is {getAmount()}</h3>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-success btn-block"
              onClick={() => {
                onPurchase();
              }}
            >
              Buy
            </button>
          </div>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          const orerData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            status: "Recieved",
          };
          createOrder(userId, token, orerData);
          cartEmpty(() => console.log("cart empty"));
          setReload(!reload);
        })
        .catch((err) => {
          setInfo({ ...info, loading: false, success: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return <div>{showbtDropIn()}</div>;
};

export default Payment;
