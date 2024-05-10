import React, { useState } from "react";
import { Link } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

import "./Page.css";
const WS_URL = "ws://localhost:5000";

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
    maxWidth: "800px",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "30px",
    color: "#f56f47",
    textTransform: "uppercase",
  },
  section: {
    marginBottom: "40px",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#ccc",
    position: "relative",
    zIndex: 1,
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  link: {
    padding: "12px 24px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "6px",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease",
    marginRight: "10px", // Aggiungo margine destro per separare i bottoni
  },
};

function Home() {
  const [username, setUsername] = useState("");
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>
          CAPOLAVORO{" "}
          <strong style={{ color: "#ff7b00" }}>Christian Marconetto</strong>
        </h1>
        <div style={styles.section}>
          <h2
            style={{
              color: "#ff7b00",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Abstract
          </h2>
          <p style={styles.description}>
            Questo progetto si propone di creare un'esperienza interattiva e
            istruttiva attraverso l'utilizzo di tecnologie avanzate e dati
            spaziali. Attraverso l'impiego di
            <strong
              style={{
                color: "#007bff",
                cursor: "pointer",
                position: "relative",
              }}
            >
              Node.js
            </strong>
            , l'applicazione web offre una rappresentazione tridimensionale del
            pianeta Terra, accompagnata da informazioni in tempo reale sulla
            posizione certificata dei satelliti in orbita, fornite da API
            specializzate.
          </p>
        </div>

        <div style={styles.section}>
          <h2
            style={{
              color: "#ff7b00",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Tecnologie Utilizzate
          </h2>
          <p style={styles.description}>
            Il cuore del progetto è{" "}
            <strong style={{ color: "#007bff" }}>Node.js</strong>, un ambiente
            di runtime JavaScript, che fornisce un'elevata efficienza
            nell'esecuzione di operazioni di I/O, rendendolo ideale per
            un'applicazione web interattiva come "Capolavoro". Le API
            selezionate forniscono dati accurati sulla posizione dei satelliti
            in tempo reale, contribuendo a creare un'esperienza utente
            coinvolgente e informativa.
          </p>
        </div>

        <div style={styles.section}>
          <h2
            style={{
              color: "#ff7b00",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Funzionalità Principali
          </h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={styles.description}>
              <strong>Rappresentazione 3D del Pianeta:</strong> Capolavoro offre
              una visualizzazione tridimensionale del nostro pianeta Terra.
              Utilizzando tecnologie avanzate di rendering, gli utenti possono
              esplorare il globo terracqueo con dettagli impressionanti.
            </li>
            <li style={styles.description}>
              <strong>Posizione Certificata dei Satelliti:</strong> Le API
              integrate forniscono informazioni aggiornate sulla posizione
              certificata dei satelliti in orbita. Gli utenti possono
              selezionare specifici satelliti per ottenere dettagli sulla loro
              orbita, altitudine e altre informazioni rilevanti.
            </li>
            <li style={styles.description}>
              <strong>Interattività:</strong> L'applicazione offre
              un'interfaccia utente intuitiva che consente agli utenti di
              interagire con il pianeta e i satelliti. Le funzionalità di zoom,
              rotazione e ricerca migliorano l'esperienza di esplorazione.
            </li>
            <li style={styles.description}>
              <strong>Dati in Tempo Reale:</strong> Grazie alle API, il progetto
              "Capolavoro" è in grado di fornire dati in tempo reale sulla
              posizione dei satelliti. Questo aggiornamento continuo assicura
              che gli utenti ottengano informazioni accurate e attuali.
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
          </Link>{" "}
          {/* Aggiunto il link per accedere a /sat */}
        </div>
      </div>
    </div>
  );
}

export default Home;
