import React, { useEffect, useState } from "react";
import { removeItemFromCart, updateQty } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const CartItem = ({ product, setReload = (f) => f, reload = undefined }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    changeCart();
  }, [quantity]);

  const howMany = () => {
    setQuantity(product.quantity ? product.quantity : 1);
  };
  useEffect(() => {
    howMany();
  }, []);

  const removeProduct = () => {
    removeItemFromCart(product._id, () => {
      setReload(!reload);
    });
  };
  const changeCart = () => {
    quantity <= 0
      ? removeProduct()
      : updateQty(product._id, quantity, () => {
          setReload(!reload);
        });
  };

  const decreaseQuants = () => {
    setQuantity(quantity - 1);
    setReload(!reload);
  };

  const increaseQuants = () => {
    setQuantity(quantity + 1);
    setReload(!reload);
  };

  return (
    <div>
      <span className="img-circle">
        <ImageHelper product={product} className="cart-img" />
      </span>
      <span className="">
        <span className="text-center text-black">{product.name}</span>
        <p className="text-center price-text">
          <i className="fa fa-rupee rupee"></i> {product.price}
        </p>

        <div className="quantity">
          <div className="quantity-btn">
            <button
              onClick={() => {
                decreaseQuants();
              }}
              className="btn btn-sm btn-info"
            >
              <span className="quantity-btn-text">-</span>
            </button>
          </div>
          <p className="price-text quantity-num">{product.quantity}</p>
          <div className="quantity-btn">
            <button
              onClick={() => {
                increaseQuants();
              }}
              className="btn btn-sm btn-info"
            >
              <span className="quantity-btn-text">+</span>
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default CartItem;
