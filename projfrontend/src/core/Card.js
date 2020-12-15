import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A Photo Title";
  const cardDescription = product
    ? product.description
    : "Photo Default description";
  const cardPrice = product ? product.price : "Default";

  const addThisToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addThisToCart}
          className="btn rounded btn-primary btn-sm "
        >
          <i className="fa fa-shopping-cart"></i> Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn rounded btn-outline-danger btn-sm "
        >
          <i className="fa fa-shopping-cart fa-flip-horizontal "></i> Remove
        </button>
      )
    );
  };
  //<span className="mycard-title">{cardTitle}</span>
  return (
    <div className="mycard">
      <div className="mycard-header">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
      </div>

      <span className="">
        <span className="mycard-title">{cardTitle}</span>
        <p className="btn btn-success rounded  btn-sm px-4">
          <i className="fa fa-rupee"></i> {cardPrice}
        </p>
      </span>
      <div className="row mycard-meta">
        <div className="col-6">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
        <div className="col-6">
          <Link
            to={`/product/${product._id}`}
            className="btn rounded btn-secondary btn-sm"
          >
            <i className="fa fa-info-circle"></i> Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
