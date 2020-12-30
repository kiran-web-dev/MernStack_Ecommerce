import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getProduct } from "../admin/helper/adminapicall";
import Base from "./Base";
import { addItemToCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

function ViewProduct({ match }) {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const loadProduct = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    loadProduct(match.params.productId);
  }, []);

  const showAddToCart = () => {
    return (
      <button
        onClick={addThisToCart}
        className="btn rounded btn-primary btn-md btn-block mb-3"
      >
        <i className="fa fa-shopping-cart"></i> Add to Cart
      </button>
    );
  };

  const addThisToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      //TODO: redirect to http://localhost:3000/cart
      return <Redirect to="/cart" />;
    }
  };

  return (
    <Base
      title="View Product"
      description="see more details about the product here"
    >
      <h1 className="text-black">{product.name}</h1>
      <div className="viewproduct">
        <div className="viewproduct-img">
          {getRedirect(redirect)}
          <ImageHelper product={product} />
          <h4 className="text-black text-center">{product.name}</h4>
        </div>
        <div className="viewproduct-details">
          <section>
            <p className="text-black text-md-left">{product.description}</p>
            <p>
              <p className="price-text">
                <i className="fa fa-rupee rupee"></i> {product.price}
              </p>
            </p>
          </section>
          {showAddToCart()}
        </div>
      </div>
    </Base>
  );
}

export default ViewProduct;
