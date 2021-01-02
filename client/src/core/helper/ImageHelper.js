import React from "react";
import { API } from "../../backend";
import { Link } from "react-router-dom";

const ImageHelper = ({ product }) => {
  const imgUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  return (
    <div className="">
      <Link className="" to={`/product/${product._id}`}>
        <img
          src={imgUrl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </Link>
    </div>
  );
};

//<div className="rounded border border-success p-2">
//img class ->  className="mb-3 rounded"
export default ImageHelper;
