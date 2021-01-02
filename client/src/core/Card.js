import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  addItemToCart,
  loadCart,
  removeItemFromCart,
} from "./helper/cartHelper";
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
  const [goto, setGoto] = useState(false);
  const [cartupdated, setCartupdated] = useState(false);

  const [count, setCount] = useState(product.count);
  let cart;

  const cardTitle = product ? product.name : "A Photo Title";
  const cardDescription = product
    ? product.description
    : "Photo Default description";
  const cardPrice = product ? product.price : "Default";

  const addThisToCart = () => {
    addItemToCart(product, () => {
      addToCart = false;
      setCartupdated(!cartupdated);
    });
  };

  useEffect(() => {
    showGoToCart(goto);
  }, [goto, cartupdated]);

  useEffect(() => {
    whosInCart(product._id);
    setCartupdated(true);
  }, [cartupdated]);

  const whosInCart = (productId) => {
    cart = loadCart();
    cart.forEach((obj) => {
      if (productId === obj._id) {
        setGoto(true);
      }
    });
  };
  const showGoToCart = (goto) => {
    return (
      goto &&
      !removeFromCart && (
        <button
          onClick={shouldRedirect}
          className="btn rounded btn-warning btn-sm "
        >
          <i className="fa fa-shopping-cart"></i> Go to Cart
        </button>
      )
    );
  };

  const shouldRedirect = () => {
    setRedirect(true);
  };
  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart &&
      !goto && (
        <button
          onClick={() => {
            addThisToCart();
            setReload(!reload);
          }}
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
        <p className="text-center price-text">
          <i className="fa fa-rupee rupee"></i> {cardPrice}
        </p>
      </span>
      <div className="row mycard-meta">
        <div className="col-6">
          {showAddToCart(addToCart)}
          {showGoToCart(goto)}
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
