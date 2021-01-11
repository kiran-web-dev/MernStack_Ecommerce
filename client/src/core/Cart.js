import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Payment from "../paymentGateway/Payment";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {
  loadCart,
  addItemToCart,
  removeItemFromCart,
} from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";
import CartItem from "./CartItem";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  //const [cardPrice, setCardPrice] = useState(0);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="">
        <div className="viewcart-prod">
          {products.map((product, index) => {
            return (
              <div key={index} className="viewcart-prod-child mb-2">
                <CartItem
                  product={product}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
        </div>
        {loadAddMore()}
      </div>
    );
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product, index) => {
      amount = amount + product.price * product.quantity;
    });
    return amount;
  };

  const loadAddMore = () => {
    return (
      <div className="mb-5">
        <Link to="/">
          <button className="btn btn-outline btn-warning">
            Add More Products
          </button>
        </Link>
      </div>
    );
  };

  return (
    <Base
      requireHeader="true"
      title="Cart Page"
      description="Ready to checkout"
    >
      <div className="viewcart text-center">
        <div className="">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <div className="mb-5">
              <h3 className="text-black mb-5">Add Something to Cart </h3>
              <Link to="/">
                <button className="btn btn-outline btn-warning">
                  Explore Products
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="mb-4">
          {!isAuthenticated() && (
            <div>
              <h3 className="text-black">Login to Get Payment Option</h3>
              <Link to="/signup">
                <button className="btn btn-outline btn-sm btn-info">
                  SignUp
                </button>
              </Link>
              <Link to="/signin">
                <button className="btn btn-outline btn-sm btn-success">
                  SignIn
                </button>
              </Link>
            </div>
          )}
          <div className="">
            <Payment
              products={products}
              setReload={setReload}
              finalAmount={getAmount()}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
