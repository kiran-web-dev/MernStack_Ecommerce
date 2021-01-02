import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import AdminDashBoard from "../user/AdminDashBoard";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

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

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  return (
    <AdminDashBoard>
      <h2 className="ml-2 mb-4">All Categories:</h2>

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
                      deleteThisCategory(category._id);
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

export default ManageCategories;
