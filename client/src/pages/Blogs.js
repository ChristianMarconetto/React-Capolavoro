import React from "react";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Footer from "./components/Footer";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "800px",
    padding: "20px",
    borderBottom: "1px solid #333",
    marginBottom: "40px",
  },
  navLink: {
    textDecoration: "none",
    color: "#fff",
    marginRight: "20px",
    fontSize: "1.2rem",
    transition: "color 0.3s ease",
  },
  activeLink: {
    color: "#ff7b00",
  },
  section: {
    width: "100%",
    maxWidth: "800px",
    padding: "40px",
    textAlign: "center",
    borderBottom: "1px solid #333",
    marginBottom: "40px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "30px",
    color: "#f56f47",
    textTransform: "uppercase",
  },
  subTitle: {
    color: "#ff7b00",
    marginBottom: "20px",
    textTransform: "uppercase",
    fontSize: "2rem",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#ccc",
    margin: "0 auto",
    maxWidth: "800px",
    textAlign: "justify",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    flexWrap: "wrap",
  },
  link: {
    padding: "12px 24px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "6px",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease",
    margin: "10px",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
};

function Blogs() {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Blogs - Ultimi Post</title>
        <meta
          name="description"
          content="Scopri gli ultimi post del nostro blog su TerraSat."
        />
        {/* Altri meta tag per SEO */}
      </Helmet>
      <Header />
      <div style={styles.section}>
        <h2 style={styles.title}>Blogs Page</h2>
        <p style={styles.description}>Check out our latest blog posts.</p>
        <div style={styles.description}>
          <h3>Altri Siti di Interesse</h3>
          <ul>
            <li>
              <strong>GitHub Repository React-Capolavoro:</strong> Repository
              del progetto React-Capolavoro su GitHub.
            </li>
            <li>
              <strong>GitHub Profilo di Christian Marconetto:</strong> Profilo
              GitHub di Christian Marconetto.
            </li>
            <li>
              <strong>TLE API di Ivan Stanojević:</strong> API per i dati dei
              satelliti forniti da Ivan Stanojević.
            </li>
            <li>
              <strong>Node.js:</strong> Sito ufficiale di Node.js per
              informazioni sulla piattaforma.
            </li>
            <li>
              <strong>Legacy React Documentation:</strong> Documentazione legacy
              di React per versioni precedenti.
            </li>
            <li>
              <strong>API NASA:</strong> Sito ufficiale delle API fornite dalla
              NASA.
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.linkContainer}>
        <a
          href="https://github.com/react-capolavoro"
          style={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository React-Capolavoro
        </a>
        <a
          href="https://github.com/christianmarconetto"
          style={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profilo di Christian Marconetto
        </a>
        <a
          href="https://tle.ivanstanojevic.me/"
          style={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          TLE API di Ivan Stanojević
        </a>
        <a
          href="https://nodejs.org/"
          style={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Node.js
        </a>
        <a
          href="https://legacy.reactjs.org/"
          style={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Legacy React Documentation
        </a>
        <a
          href="https://api.nasa.gov/"
          style={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          API NASA
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;
