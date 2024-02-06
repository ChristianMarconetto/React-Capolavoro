import React from "react"
import { Link } from "react-router-dom";
import "./Page.css";

function Register() {
return(
    <div className="page">
<h2>Registrazione</h2>
<form className="register-form">
  <div className="form-group">
    <label htmlFor="name">Nome:</label>
    <input type="text" id="name" />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" />
  </div>
  <div className="form-group">
    <label htmlFor="confirm-password">Conferma Password:</label>
    <input type="password" id="confirm-password" />
  </div>
  <button type="submit">Registrati</button>
</form>
<p>
  Hai già un account? <Link to="/login">Accedi qui</Link>.
</p>
</div>
);
}
export default Register;