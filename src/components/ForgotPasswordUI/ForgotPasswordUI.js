import React from 'react';
import './ForgotPasswordUI.css';

const ForgotPasswordUI = () => {
    return (
            <div className="login-container">
              <h1 className="heading">Forgot Password?</h1>
              <div>
                <input
                  className="input"
                  placeholder="Email"
                  type="text"
                  name="name"
                  id="name"
                />

                  <button className="signin_button" type="submit">
                    Reset Password
                  </button>
                </div>
              </div>
          );
        };
  export default ForgotPasswordUI;
