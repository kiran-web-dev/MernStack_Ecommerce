import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminDashBoard = ({ className = "", children }) => {
  const { name, email, role } = isAuthenticated().user;

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link ">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link ">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link ">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link ">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link ">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to Admin Area"
      description="Manage the things here"
      className="container bg-info p-4"
    >
      <div className="admin-dash">
        <div className="admin-dash-nav">{<AdminNav />}</div>
        <div className="admin-dash-child">
          <div className={className}>{children}</div>
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
//container bg-info p-4
//<AdminNav />
/*<div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div> */

/*
 


      <Base
      title="Welcome to Admin Area"
      description="Manage the things here"
      className=""
    >
      <AdminNav />
    </Base>
    */
