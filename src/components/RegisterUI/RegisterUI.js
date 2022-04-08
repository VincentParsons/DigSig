import React from "react";
import "./RegisterUI.css";

const RegisterUI = () => {
  return (
    <div className="login-container">
      <h1 className="heading">Signup Here!</h1>
      <div>
        <form action="http://127.0.0.1:5000/register" method="post">
          <input
            className="input"
            placeholder="Email"
            type="text"
            name="email"
            id="name"
          />
          <div>
            <input
              className="input"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="signin_container">
            <button className="signin_button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUI;
