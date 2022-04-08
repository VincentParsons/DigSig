import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { Editor } from './components/editor/editor';
import Main from "./pages/Main"
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginUI from './components/LoginUI/LoginUI';
import RegisterUI from './components/RegisterUI/RegisterUI';
import AdminUI from './components/AdminUI/AdminUI';
import ForgotPasswordUI from './components/ForgotPasswordUI/ForgotPasswordUI';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path = "/editor" component = {Main} />
      <Route exact path = "/" component = {App} />
      <Route exact path = "/LoginUI" component = {LoginUI} />
      <Route exact path = "/RegisterUI" component = {RegisterUI} />
      <Route exact path = "/AdminUI" component = {AdminUI} />
      <Route exact path = "/ForgotPasswordUI" component = {ForgotPasswordUI} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
