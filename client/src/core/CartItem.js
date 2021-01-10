import React, { useEffect, useState } from "react";
import { removeItemFromCart, updateQty } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const CartItem = ({ product, setReload = (f) => f, reload = undefined }) => {
  const [quantity, setQuantity] = useState(
    product.quantity ? product.quantity : 1
  );

  useEffect(() => {
    changeCart();
  }, [quantity]);

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

  const handleChange = (value) => {
    if (value == "-") {
      console.log(product.quantity + " " + quantity);
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
    setReload(!reload);
  };

  const showBtnQuantity = (value) => {
    return (
      <button
        onClick={(e) => {
          handleChange(e.target.value);
        }}
        className="btn btn-sm btn-info"
        value={value}
      >
        {value}
      </button>
    );
  };

  return (
    <div>
      <ImageHelper product={product} />
      <span className="">
        {product.name}
        <h6 className="">{product.price}</h6>
        <span className="">
          <div className="">
            {showBtnQuantity("-")}
            {product.quantity}
            {showBtnQuantity("+")}
          </div>
        </span>
      </span>
    </div>
  );
};

export default CartItem;
