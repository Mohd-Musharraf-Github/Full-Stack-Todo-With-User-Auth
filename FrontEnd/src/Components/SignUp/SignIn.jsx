import React, { useState } from "react";
import "./SignUp.css";
import SignComponent from "./SignComponent";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import{login} from "../Store/Slice/authslice"
import { login } from "../Store/Slice/AuthSlice";


export default function SignIn() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();
    await axios
      .post(`${window.location.origin}/api/v1/signin`, inputs)
      .then((response) => {
        // console.log(response.data.others._id);
        sessionStorage.setItem("id",response.data.others._id);
        dispatch(login());
        setInputs({ email: "", password: "" });
        history("/todo");
      });
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 sign-up-heading">
            {/* <h1 className="heading-sign">
              Sign <br />
              Up
            </h1> */}
            <SignComponent first="Sign" second="In" />
          </div>
          <div className="col-lg-8 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column w-100 p-5 ">
              <input
                className="p-2 m-1"
                name="email"
                placeholder="Enter Your Email"
                type="text"
                onChange={onChange}
                value={inputs.email}
              />
              <input
                className="p-2 m-1"
                name="password"
                placeholder="Enter Your Password"
                type="text"
                onChange={onChange}
                value={inputs.password}
              />
              <button onClick={submit} className="sign-up-btn m-2 p-2">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
