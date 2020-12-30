import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getProducts } from "./helper/adminapicall";
import AdminDashBoard from "../user/AdminDashBoard";

const ManageProducts = (props) => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  return (
    <AdminDashBoard>
      <h2 className="ml-2 mb-4">All products:</h2>
      <div className="row">
        <div className="col-12 admin-child-theme">
          <h2 className="text-center text-black my-3">
            Total <span className="text-primary">{products.length}</span>{" "}
            products
          </h2>
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-8">
                  <h4 className="text-primary text-left">{product.name}</h4>
                </div>
                <div className="col-2">
                  <Link
                    className="btn rounded btn-sm btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn rounded btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminDashBoard>
  );
};

export default ManageProducts;
