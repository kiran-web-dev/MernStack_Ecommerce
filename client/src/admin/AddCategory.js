import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";
import AdminDashBoard from "../user/AdminDashBoard";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    //Backend Request Fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to Create Category</h4>;
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
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <AdminDashBoard>
      <h2 className="ml-2 mb-4">New Category:</h2>
      <div className="row  admin-child-theme">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {newCategoryForm()}
        </div>
      </div>
    </AdminDashBoard>
  );
};

export default AddCategory;
