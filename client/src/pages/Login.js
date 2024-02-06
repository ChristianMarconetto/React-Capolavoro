import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

function Login() {
    return(
        <div className="page">
      <h2>Accesso</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Accedi</button>
      </form>
      <p>
        Non hai ancora un account? <Link to="/register">Registrati qui</Link>.
      </p>
    </div>
    )
}
export default Login