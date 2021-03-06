import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import AdminDashBoard from "../user/AdminDashBoard";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preLoad = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    //Backend Request Fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated Successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-warning">{error}</h4>;
    }
  };

  const newCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          placeholder="For Ex.Summer"
          required
          autoFocus
          value={name}
          onChange={handleChange}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm bg-warning mb-3" to="/admin/categories">
        Back
      </Link>
    </div>
  );

  return (
    <AdminDashBoard>
      <h2 className="ml-2 mb-4">Update Category:</h2>
      <div className="row  admin-child-theme">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </AdminDashBoard>
  );
};

export default UpdateCategory;
