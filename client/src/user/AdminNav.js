import { React, useState } from "react";

import { Link } from "react-router-dom";

import logo from "./img/kir.jpg";

function AdminNav() {
  const [navbar, setNavbar] = useState({
    navbarState: false,
    navbarClass: "collapse navbar-collapse show",
    togglerClass: "fa fa-times",
  });

  const myToggler = () => {
    navbar.navbarState
      ? setNavbar({
          navbarState: false,
          navbarClass: "collapse navbar-collapse",
          togglerClass: "fa fa-bars",
        })
      : setNavbar({
          navbarState: true,
          navbarClass: "collapse navbar-collapse show",
          togglerClass: "fa fa-times",
        });
  };

  return (
    <aside>
      <nav className="navbar">
        <button className="navbar-toggler" type="button" onClick={myToggler}>
          <span className="text-white bg-dark">
            <i className={navbar.togglerClass}></i>
          </span>
        </button>
        <div id="sidebar" className={navbar.navbarClass}>
          <ul className="sidebar-menu">
            <p className="centered">
              <img
                src={logo}
                className="img-circle"
                width="80"
                alt="Kiran Hegde"
              />
            </p>
            <h5 className="centered">Kiran Hegde</h5>
            <li className="mt bg-warning">
              <Link to="/admin/dashboard" className="link">
                <i className="fa fa-dashboard"></i>
                <span>
                  <h6 className="text-white ">Dashboard</h6>
                </span>
              </Link>
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
      </nav>
    </aside>
  );
}

export default AdminNav;
