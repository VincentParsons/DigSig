import React from "react";
import "./RegisterUI.css";

const RegisterUI = () => {
  return (
    <div className="login-container">
      <h1 className="heading">Signup Here!</h1>
      <div>
        <input
          className="input"
          placeholder="Email"
          type="text"
          name="name"
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
      </div>
    </div>
  );
};

export default RegisterUI;
