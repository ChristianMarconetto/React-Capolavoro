import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Page.css";
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "30px",
    color: "#f56f47",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "none",
    borderBottom: "2px solid #007bff",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    fontSize: "1.2rem",
    outline: "none",
  },
  button: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1.2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "1.1rem",
  },
};

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data);
    alert(data.error);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Registrati</h1>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onClick={handleSubmit}
        >
          Registrati
        </button>
        <p style={{ marginBottom: "20px" }}>
          Hai già un account?{" "}
          <Link to="/login" style={styles.link}>
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
