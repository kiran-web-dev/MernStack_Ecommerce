import React from "react";
import { Link } from "react-router-dom";

import "../style.css";
import logo from "./img/kir.jpg";

function AdminNav() {
  return (
    <aside>
      <div id="sidebar" className="nav-collapse">
        <ul className="sidebar-menu" id="nav-accordion">
          <p className="centered">
            <a href="profile.html">
              <img
                src={logo}
                className="img-circle"
                width="80"
                alt="Kiran Hegde"
              />
            </a>
          </p>
          <h5 className="centered">Kiran Hegde</h5>
          <li className="mt">
            <a className="active" href="index.html">
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <Link to="/admin/create/category" className="link">
              Create Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="link">
              Manage Categories
            </Link>
          </li>

          <li>
            <Link to="/admin/create/product" className="link">
              Create Product
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="link">
              Manage Product
            </Link>
          </li>

          <li>
            <Link to="/admin/orders" className="link">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default AdminNav;
