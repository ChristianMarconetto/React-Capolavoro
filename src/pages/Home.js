// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

function Home() {
  return (
    <>
    <div className="page">
      <h2>Benvenuto su TravelMate!</h2>
      <p>
        TravelMate è un'applicazione che semplifica la pianificazione dei tuoi viaggi in modo efficiente e divertente.
      </p>
      <h3>Cosa puoi fare con TravelMate?</h3>
      <ul>
        <li><strong>Pianifica i tuoi viaggi:</strong> Crea itinerari dettagliati, aggiungi luoghi da visitare e pianifica le tue attività.</li>
        <li><strong>Condividi con gli amici:</strong> Invita i tuoi amici a partecipare al tuo viaggio e collabora insieme nella pianificazione.</li>
        <li><strong>Tieni traccia dei tuoi viaggi passati:</strong> Archivia i dettagli dei viaggi passati e tieni viva la memoria delle tue esperienze.</li>
        <li><strong>Scopri nuove destinazioni:</strong> Esplora nuove destinazioni e scopri i luoghi più affascinanti da visitare.</li>
      </ul>
      <h3>Come iniziare</h3>
      <p>
        Per iniziare ad utilizzare TravelMate, accedi o registrati ora! Se non hai ancora un account, puoi <Link to="/register">registrarti qui</Link>.
      </p>
      <p>
        Se hai già un account, accedi subito per iniziare a pianificare il tuo prossimo viaggio!
      </p>
    </div>
    </>
  );
}

export default Home;
