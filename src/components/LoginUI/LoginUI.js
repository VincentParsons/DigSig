import React from "react";
import "./LoginUI.css";

const LoginUI = () => {
  return (
    <div className="login-container">
      <h1 className="heading">Please Sign In</h1>
      <a className="register_link" href="/RegisterUI">Register Here</a>
      <div>
        <input className="input" placeholder="Email" type="text" name="name" id="name" />
        <div>
          <input className="input"
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="signin_container">
          <button className="signin_button" type="submit">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
