import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import AdminDashBoard from "../user/AdminDashBoard";
import ManageProducts from "./ManageProducts";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const [wantdelete, setWantdelete] = useState(false);
  const [category, setCategory] = useState("");
  const [prodCount, setProdCount] = useState(0);

  const preLoad = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteACategory = (categoryId) => {
    setWantdelete(false);
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  const deleteThisCategory = (category) => {
    setWantdelete(true);
    setCategory(category);
  };

  return (
    <AdminDashBoard>
      <h2 className="ml-2 mb-4">Manage Categories:</h2>

      {!wantdelete ? (
        <div className="row">
          <div className="col-12 admin-child-theme">
            <h2 className="text-center my-3">
              Total <span className="text-primary">{categories.length}</span>{" "}
              categories
            </h2>

            {categories.map((category, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-6">
                    <h3 className="text-primary text-left">{category.name}</h3>
                  </div>
                  <div className="col-3">
                    <Link
                      className="btn rounded btn-sm btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-3">
                    <button
                      onClick={() => {
                        deleteThisCategory(category);
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
      ) : (
        <div>
          <h4 className="ml-2 text-center">
            There are <span className="font-weight-bold"> {prodCount}</span>{" "}
            products associated with the category{" "}
            <span className="font-weight-bold font-italic">
              {category.name}
            </span>
          </h4>
          {prodCount != 0 && (
            <h5 className="ml-2 text-center">
              Update the product category or delete them to proceed
            </h5>
          )}
          <ManageProducts
            categoryId={category._id}
            prodCount={prodCount}
            setProdCount={setProdCount}
          />

          {prodCount == 0 && (
            <div className="text-center">
              <p>Proceed with delete..?</p>
              <button
                onClick={() => {
                  deleteACategory(category._id);
                }}
                className="btn btn-sm btn-danger ml-3"
              >
                Yes
              </button>
            </div>
          )}
        </div>
      )}
    </AdminDashBoard>
  );
};

export default ManageCategories;
