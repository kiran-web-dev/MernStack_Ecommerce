import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import AdminNav from "./AdminNav";
import { useHistory } from "react-router-dom";

const AdminDashBoard = ({ className = "", children }) => {
  const { name, email } = isAuthenticated().user;
  let history = useHistory();

  const adminDashboardHome = () => {
    const path = "/admin/dashboard";
    if (history.location.pathname === path) {
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
    } else {
      return <div className={className}>{children}</div>;
    }
  };

  return (
    <Base className="container-fluid">
      <div className="admin-dash">
        <div className="admin-dash-nav">{<AdminNav />}</div>
        <div className="admin-dash-child">{adminDashboardHome()}</div>
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
