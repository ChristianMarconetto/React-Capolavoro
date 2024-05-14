# Christian Marconetto
## J.C. Maxwell Nichelino (TO)
### TerraSat
#### 4 Aprile 2024

## Abstract
Questo Capolavoro è un progetto che unisce tecnologie avanzate e dati spaziali per creare un'esperienza interattiva e istruttiva. L'applicazione web offre una rappresentazione tridimensionale del pianeta Terra, accompagnata da informazioni in tempo reale sulla posizione certificata dei satelliti in orbita, fornite da API specializzate. Questa documentazione fornisce un'analisi delle tecnologie utilizzate, dei principali componenti del codice e delle funzionalità implementate.

## Tecnologie Utilizzate
Il nucleo del progetto Capolavoro è basato su Node.js, un ambiente di runtime JavaScript noto per la sua efficienza nell'esecuzione di operazioni di I/O, rendendolo ideale per applicazioni web interattive. Utilizziamo il framework Express.js per gestire le richieste HTTP e WebSocket per la comunicazione in tempo reale tra il server e il client. Il client-side è sviluppato utilizzando React, un framework JavaScript per la creazione di interfacce utente, e Three.js per la rappresentazione 3D del pianeta Terra.

## Struttura del Codice
Il codice è organizzato in moduli che gestiscono diverse funzionalità dell'applicazione:

- **Server:** La logica del server è gestita principalmente da Express.js. Qui definiamo le rotte per fornire i dati dei satelliti e gestire le operazioni di registrazione e accesso degli utenti.
- **WebSocket:** Utilizziamo WebSocket per abilitare la comunicazione bidirezionale in tempo reale tra il server e il client. Questo è essenziale per aggiornare dinamicamente i dati dei satelliti e sincronizzare le interazioni degli utenti.
- **Client:** Il lato client è sviluppato utilizzando React, con componenti React per gestire la rappresentazione dell'interfaccia utente. Three.js è utilizzato per la creazione della rappresentazione tridimensionale del pianeta Terra e dei satelliti.

## Funzionalità Principali
- **Rappresentazione 3D del Pianeta:** Utilizzando Three.js, creiamo una visualizzazione tridimensionale realistica del pianeta Terra, che permette di orientarsi per avere un'idea migliore di dove si trovino i nostri satelliti.
- **Posizione Certificata dei Satelliti:** Integrando API specializzate, forniamo informazioni aggiornate sulla posizione dei satelliti in orbita intorno alla Terra. Gli utenti possono selezionare specifici satelliti per ottenere dettagli sulla loro orbita, altitudine e altre informazioni rilevanti.
- **Interattività:** L'applicazione offre un'interfaccia utente intuitiva che consente agli utenti di interagire con il pianeta e i satelliti. Gli utenti possono zoomare, ruotare e cercare per esplorare il pianeta da diverse prospettive.
- **Dati in Tempo Reale:** Grazie alla comunicazione WebSocket e all'integrazione con le API, l'applicazione fornisce dati in tempo reale sulla posizione dei satelliti. Questo garantisce che gli utenti ottengano informazioni accurate e aggiornate durante l'esplorazione dello spazio.

## Conclusioni
Il progetto rappresenta un esempio di integrazione efficace tra tecnologie “avanzate” e conoscenze spaziali. Attraverso la sua rappresentazione tridimensionale del pianeta Terra e le informazioni in tempo reale sui satelliti, TerraSat offre agli utenti un'esperienza unica e informativa, contribuendo a stimolare la curiosità e l'apprendimento su tematiche spaziali.
