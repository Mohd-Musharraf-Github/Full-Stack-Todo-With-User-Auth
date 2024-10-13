import React, { useDebugValue } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Slice/AuthSlice"; 

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch()

  const handleOnClick =()=>{
      sessionStorage.clear("id");
      dispatch(logout());
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>TODO</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/aboutMe"
                >
                  About Me
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo"
                >
                  Todo
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active button-nav"
                    aria-current="page"
                    to="#"
                    onClick={handleOnClick}
                  >
                    LogOut
                  </Link>
                </li>
              ) : (
                <>
                  {" "}
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active button-nav"
                      aria-current="page"
                      to="/signUp"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active button-nav"
                      aria-current="page"
                      to="/signIn"
                    >
                      SignIn
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
