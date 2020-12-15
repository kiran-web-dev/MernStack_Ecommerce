import { React, Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import logo from "./images/logo.jpg";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Navigation = ({ history }) => {
  const [navbar, setNavbar] = useState({
    navbarState: false,
    navbarClass: "collapse navbar-collapse",
  });

  const myToggler = () => {
    navbar.navbarState
      ? setNavbar({
          navbarState: false,
          navbarClass: "collapse navbar-collapse",
        })
      : setNavbar({
          navbarState: true,
          navbarClass: "collapse navbar-collapse show text-center",
        });
  };

  return (
    <nav className="navbar navbar-expand-sm text-white bg-dark">
      <Link className="navbar-brand ml-1" to="/">
        <img src={logo} alt="logo here" width="40px" />
      </Link>
      <button className="navbar-toggler" type="button" onClick={myToggler}>
        <span className="text-white">
          <i class="fa fa-bars"></i>
        </span>
      </button>
      <div className={navbar.navbarClass}>
        <ul className="navbar-nav bg-dark">
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              Cart
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  SignIn
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                SignOut
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
