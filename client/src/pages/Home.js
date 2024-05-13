import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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

function Home() {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>
          TerraSat - Esplora il nostro pianeta e i satelliti in tempo reale
        </title>
        <meta
          name="description"
          content="Unisciti a TerraSat per scoprire la Terra e i satelliti con la nostra mappa interattiva 3D. Accedi a dati in tempo reale e esplora l'universo come mai prima d'ora."
        />
        <meta
          name="keywords"
          content="TerraSat, esplorazione spaziale, satelliti, mappa 3D, dati in tempo reale, Node.js, NASA, React Three Fiber"
        />
        {/* Altri meta tag per SEO */}
      </Helmet>
      <div style={styles.section}>
        <h1 style={styles.title}>
          Esplora Terra e Satelliti{" "}
          <strong style={{ color: "#ff7b00" }}>TerraSat</strong>
        </h1>
        <div style={styles.section}>
          <h2 style={styles.subTitle}>Introduzione</h2>
          <p style={styles.description}>
            Benvenuti in TerraSat, il portale che vi porta nello spazio! Con la
            nostra piattaforma, potrete toccare con mano la bellezza del nostro
            pianeta e la complessità dell'universo satellitare. Scoprite come la
            tecnologia moderna ci permette di osservare la Terra da una
            prospettiva mai vista prima e di monitorare i nostri satelliti in
            tempo reale.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subTitle}>Tecnologie Utilizzate</h2>
          <p style={styles.description}>
            Il nostro sistema si basa su{" "}
            <a href="https://nodejs.org/en" style={{ color: "#4e9af1" }}>
              Node.js
            </a>
            , un potente ambiente di runtime JavaScript che ci permette di
            gestire operazioni di I/O con incredibile efficienza. Utilizziamo
            anche una serie di{" "}
            <a href="https://api.nasa.gov/" style={{ color: "#4e9af1" }}>
              API fornite dalla NASA
            </a>{" "}
            per accedere a dati satellitari aggiornati, che ci consentono di
            offrire una mappa interattiva e dinamica del nostro pianeta.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subTitle}>Funzionalità Principali</h2>
          <ul style={styles.description}>
            <li>
              <strong>Rappresentazione 3D del Pianeta:</strong> Grazie a
              tecnologie di rendering all'avanguardia come{" "}
              <a
                href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
                style={{ color: "#4e9af1" }}
              >
                React Three Fiber
              </a>
              , TerraSat offre una mappa tridimensionale della Terra,
              permettendovi di esplorare ogni angolo del globo con una
              precisione mozzafiato.
            </li>
            <li>
              <strong>Posizione Certificata dei Satelliti:</strong> Le nostre
              API integrano dati precisi sulla posizione dei satelliti, fornendo
              informazioni dettagliate su orbita, altitudine e altre metriche
              essenziali.
            </li>
            <li>
              <strong>Interattività:</strong> Interagite con il pianeta e i
              satelliti utilizzando funzionalità intuitive di zoom e rotazione,
              per un'esperienza utente senza precedenti.
            </li>
            <li>
              <strong>Dati in Tempo Reale:</strong> TerraSat si aggiorna
              continuamente, garantendo che le informazioni visualizzate siano
              sempre le più recenti disponibili.
            </li>
          </ul>
        </div>
        <div style={styles.linkContainer}>
          <Link to="/register" style={styles.link}>
            Registrati
          </Link>
          <Link to="/login" style={styles.link}>
            Accedi
          </Link>
          <Link to="/sat" style={styles.link}>
            Satelliti
          </Link>
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
      </div>
    </div>
  );
}

export default Home;
