import React, { useState } from "react";
import "./SignUp.css";
import SignComponent from "./SignComponent";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function SignUp() {

  const history = useNavigate();

  const [inputs, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });


  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputs, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();
    await axios
      .post(`${window.location.origin}/api/v1/register`, inputs)
      .then((response) => {
        if (response.data.message === "user already exist") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
          setInput({ email: "", username: "", password: "" });
          history("/signIn");
        }
      });
  };
  return (
    <div className="sign-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 m-2"
                name="email"
                placeholder="Enter Your Email"
                type="email"
                onChange={onChange}
                value={inputs.email}
              />
              <input
                className="p-2 m-2"
                name="username"
                placeholder="Enter Your UserName"
                type="username"
                onChange={onChange}
                value={inputs.username}
              />
              <input
                className="p-2 m-2"
                name="password"
                placeholder="Enter Your Password"
                type="password"
                onChange={onChange}
                value={inputs.password}
              />
              <button onClick={submit} className="sign-up-btn m-2 p-2">
                Sign Up
              </button>
            </div>
          </div>
          <div className="col-lg-4 sign-up-heading">
            {/* <h1 className="heading-sign">
              Sign <br />
              Up
            </h1> */}
            <SignComponent first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
}
