// NoPage.js
import React from "react";
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
    textAlign: 'center',
  },
  content: {
    maxWidth: '400px',
    padding: '40px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#f56f47',
    textTransform: 'uppercase',
  },
  message: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#ccc',
  },
};

function NoPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Errore 403/404 - Accesso Negato</h1>
        <p style={styles.message}>Ci dispiace, ma non hai il permesso per accedere a questa pagina o non è esistente.</p>
      </div>
    </div>
  );
}


export default NoPage;
