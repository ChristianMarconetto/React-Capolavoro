import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Page.css";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1f1f1f',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    width: '100%',
    maxWidth: '800px',
    padding: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '30px',
    color: '#f56f47',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: '40px',
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#ccc',
    position: 'relative',
    zIndex: 1,
  },
  bannerContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  banner: {
    position: 'absolute',
    top: '-150px',
    left: '50%',
    width:"100px",
    heigth:"50px",
    transform: 'translateX(-50%)',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '6px',
    zIndex: 999,
    display: 'none',
    transition: 'opacity 0.3s ease',
    opacity: 0,
  },
  bannerArrow: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTop: '20px solid #007bff',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    zIndex: 998,
    display: 'none',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
  link: {
    padding: '12px 24px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '6px',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#0056b3',
  },
};

function Home() {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>CAPOLAVORO <strong style={{ color: '#ff7b00' }}>Christian Marconetto</strong></h1>
        <div style={styles.section}>
          <h2 style={{ color: '#ff7b00', marginBottom: '20px', textTransform: 'uppercase' }}>Abstract</h2>
          <p style={styles.description}>
            Questo progetto si propone di creare un'esperienza interattiva e istruttiva attraverso l'utilizzo di tecnologie avanzate e dati spaziali. Attraverso l'impiego di 
            <div
              style={{ ...styles.bannerContainer, position: 'relative', zIndex: 1 }} // Aggiungiamo z-index per sovrapporre il banner al testo
              onMouseEnter={() => setShowBanner(true)}
              onMouseLeave={() => setShowBanner(false)}
            >
              <strong style={{ color: '#007bff', cursor: 'pointer', position: 'relative' }}>Node.js</strong>
              <div style={{ ...styles.banner, display: showBanner ? 'block' : 'none', opacity: showBanner ? 1 : 0 }}>
                Clicca qui per saperne di più su <Link to="/nodejs" style={{ color: '#fff', textDecoration: 'underline' }}>Node.js</Link>
              </div>
              <div style={{ ...styles.bannerArrow, display: showBanner ? 'block' : 'none' }}></div>
            </div>
            , l'applicazione web offre una rappresentazione tridimensionale del pianeta Terra, accompagnata da informazioni in tempo reale sulla posizione certificata dei satelliti in orbita, fornite da API specializzate.
          </p>
        </div>
        
        <div style={styles.section}>
          <h2 style={{ color: '#ff7b00', marginBottom: '20px', textTransform: 'uppercase' }}>Tecnologie Utilizzate</h2>
          <p style={styles.description}>
            Il cuore del progetto è <strong style={{ color: '#007bff' }}>Node.js</strong>, un ambiente di runtime JavaScript, che fornisce un'elevata efficienza nell'esecuzione di operazioni di I/O, rendendolo ideale per un'applicazione web interattiva come "Capolavoro". Le API selezionate forniscono dati accurati sulla posizione dei satelliti in tempo reale, contribuendo a creare un'esperienza utente coinvolgente e informativa.
          </p>
        </div>
        
        <div style={styles.section}>
          <h2 style={{ color: '#ff7b00', marginBottom: '20px', textTransform: 'uppercase' }}>Funzionalità Principali</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={styles.description}><strong>Rappresentazione 3D del Pianeta:</strong> Capolavoro offre una visualizzazione tridimensionale del nostro pianeta Terra. Utilizzando tecnologie avanzate di rendering, gli utenti possono esplorare il globo terracqueo con dettagli impressionanti.</li>
            <li style={styles.description}><strong>Posizione Certificata dei Satelliti:</strong> Le API integrate forniscono informazioni aggiornate sulla posizione certificata dei satelliti in orbita. Gli utenti possono selezionare specifici satelliti per ottenere dettagli sulla loro orbita, altitudine e altre informazioni rilevanti.</li>
            <li style={styles.description}><strong>Interattività:</strong> L'applicazione offre un'interfaccia utente intuitiva che consente agli utenti di interagire con il pianeta e i satelliti. Le funzionalità di zoom, rotazione e ricerca migliorano l'esperienza di esplorazione.</li>
            <li style={styles.description}><strong>Dati in Tempo Reale:</strong> Grazie alle API, il progetto "Capolavoro" è in grado di fornire dati in tempo reale sulla posizione dei satelliti. Questo aggiornamento continuo assicura che gli utenti ottengano informazioni accurate e attuali.</li>
          </ul>
        </div>
        
        <div style={styles.linkContainer}>
          <Link to="/register" style={styles.link} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>Registrati</Link>
          <Link to="/login" style={styles.link} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>Accedi</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
