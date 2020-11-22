import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Payment from "../paymentGateway/Payment";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-6 mb-2">
              <Card
                product={product}
                addToCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
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
        <div className="col-6">
          {!isAuthenticated() && (
            <h3 className="text-black">Login to Get Payment Option</h3>
          )}
          <Payment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
