import React from "react";
import "./LoginUI.css";

const submitHandler = (e) => {
  if (e.target.email.value === '' || e.target.password.value === '') {
    e.preventDefault();
    alert('Invalid credentials, please check username or password and try again.');
  }
}

const LoginUI = () => {
  return (
    <div className="login-container">
      <h1 className="heading">Please Sign In</h1>
        <p className='registertext'>Don't have an account?<a className="register_link" href="/RegisterUI"> &nbsp; Register Here</a></p>

      <form onSubmit={submitHandler} action="http://127.0.0.1:5000/login" method="post">
        <input className="input" placeholder="Email" type="text" name="email" />
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
      </form>
    </div>
  );
};

export default LoginUI;
