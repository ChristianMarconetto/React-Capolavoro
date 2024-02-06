// Login.js
import React from "react";
import "./Login.css";

function Login({ children }) {
  return (
    <div className="login">
      <header>
        <h1>Header</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default Login;
