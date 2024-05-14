// Importazione delle librerie e delle dipendenze necessarie
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getSatelliteInfo } = require("tle.js/dist/tlejs.cjs");
const expressWs = require("express-ws");
const { v4: uuidv4 } = require("uuid");

// Inizializzazione del server Express
const server = express();
expressWs(server);

// Configurazione del server e definizione delle costanti
const PORT = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());

let satellitesData = {};

// Funzione per recuperare i dati TLE da un servizio esterno
async function fetchTLE(noradId) {
  try {
    const url = `https://tle.ivanstanojevic.me/api/tle/${noradId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Errore durante l'acquisizione dei dati TLE:", error);
    return null;
  }
}

// Funzione per creare una tabella nel database al momento dell'avvio del server
async function createTable() {
  const { exec } = require("child_process");
  exec("npx prisma migrate dev", (error, stdout, stderr) => {
    if (error) {
      console.log(
        `Errore durante l'esecuzione della migrazione: ${error.message}`
      );
      return;
    }
    if (stderr) {
      console.log(`Errore durante l'esecuzione della migrazione: ${stderr}`);
      return;
    }
    console.log(`Risultato della migrazione: ${stdout}`);
  });
}

// Chiamata alla funzione all'avvio del server per creare la tabella nel database
createTable();
const satellites = [
  { name: "ISS(ZARYA)", noradId: 25544, description: "Zarya, noto anche come Blocco di carico funzionale o FGB, è il primo modulo della Stazione Spaziale Internazionale ad essere stato lanciato. Forniva energia elettrica, stoccaggio, propulsione e guida alla ISS durante la fase iniziale di assemblaggio." },
  { name: "PROXIMAI", noradId: 43694, description: "Proxima 1 e 2 sono satelliti precursori per la rete di satelliti Centauri pianificata da Fleet Space Technologies per la connettività globale dei satelliti a Internet of Things (IoT). I satelliti Proxima sono costruiti secondo il fattore di forma CubeSat 1.5U." },
  { name: "NORSAT1", noradId: 42826, description: "NorSat-1 è una missione microsatellitare del Norwegian Space Centre (NSC) che mira a indagare sulla radiazione solare e sulle condizioni meteorologiche spaziali, nonché a sviluppare nuovi metodi per il rilevamento e la gestione del traffico navale." },
  { name: "CENTAURI-3(TYVAK-0210)", noradId: 47966, description: "Centauri 3 è un satellite precursore per la rete di 140 satelliti pianificata da Fleet Space Technologies per la connettività globale dei satelliti a Internet of Things (IoT) progettata per l’uso nelle industrie energetiche, delle utilities e delle risorse. I satelliti Centauri sono costruiti secondo il fattore di forma CubeSat 6U." },
  { name: "NOAA18", noradId: 28654, description: "NOAA-18, noto prima del lancio come NOAA-N, è un satellite per le previsioni meteorologiche gestito da NOAA. NOAA-N (18) è stato lanciato il 20 maggio 2005, in un’orbita sincrona con il sole ad un’altitudine di 854 km sopra la Terra, con un periodo orbitale di 102 minuti." },
  { name: "ITASAT", noradId: 43786, description: "Non ho potuto trovare informazioni dettagliate su questo satellite." },
  { name: "NORSAT2", noradId: 42828, description: "NorSat-2 è il secondo satellite della serie di microsatelliti, lanciato anch’esso nel luglio 2017, e mira a fornire servizi di tracciamento navale avanzati e servizi di scambio di dati in VHF (VDE)." },
  { name: "ZHUHAI-102(CAS-4B)", noradId: 42759, description: "Il satellite ZHUHAI-1 02 è uno dei primi due membri di una costellazione commerciale di satelliti per l’osservazione della Terra per Zhuhai Orbita Control Engineering Co. Ltd. con sede nella provincia del Guangdong, nel sud della Cina." },
  { name: "AISSAT2", noradId: 40075, description: "È il secondo satellite del Sistema di identificazione automatica come parte di una costellazione di satelliti di monitoraggio delle navi gestita dal governo norvegese e costruita dall’Università di Toronto. Il primo AISSat è stato lanciato nel 2010 e ha dimostrato con successo l’applicazione di un terminale AIS basato nello spazio per il monitoraggio dei movimenti delle navi." },
  { name: "KKS-1(KISEKI)", noradId: 33499, description: "È un piccolo satellite tecnologico educativo costruito dal Tokyo Metropolitan College of Industrial Technology. Il suo scopo è dimostrare esperimenti su micro-propulsori, condurre esperimenti di base sul controllo dell’assetto a 3 assi e scattare immagini terrestri con una telecamera." },
  { name: "NOAA19", noradId: 33591, description: "È l’ultimo della serie di satelliti meteorologici dell’American National Oceanic and Atmospheric Administration (NOAA). NOAA-19 è stato lanciato il 6 febbraio 2009." },
  { name: "AISSAT1", noradId: 36797, description: "È un satellite utilizzato per ricevere segnali del Sistema di identificazione automatica (AIS). Lanciato il 12 giugno 2010 dal Satish Dhawan Space Centre come carico utile secondario, AISSat-1 è in un’orbita terrestre bassa sincrona con il sole." },
  { name: "NOAA15", noradId: 25338, description: "È un satellite meteorologico operativo, polarmente orbitante, gestito dalla National Oceanic and Atmospheric Administration (NOAA). Era l’ultimo della serie Advanced TIROS-N (ATN) e il design si basava sul Defense Meteorological Satellite Program (DMSP)." },
  { name: "CENTAURI-1", noradId: 43809, description: "È un satellite per la connettività globale via satellite all’Internet delle cose (IoT). I satelliti Centauri sono costruiti secondo il formato CubeSat 3U." },
  { name: "PROXIMAII", noradId: 43696, description: "È un satellite di comunicazione americano che fa parte del Tracking and Data Relay Satellite System operato dalla NASA. Il satellite Proxima II è basato sul formato CubeSat 1.5U." },
  { name: "NORSAT3", noradId: 48272, description: "È il terzo microsatellita della serie NorSat, costruito dall’University of Toronto Institute for Aerospace Studies’ Space Flight Laboratories (UTIAS/SFL) per l’Agenzia Spaziale Norvegese (NOSA) e il Norwegian Defence Research Establishment (FFI). Lanciato nell’aprile 2021, la missione operativa mira a sostituire due satelliti presto da dismettere dalla costellazione AISSat e a rafforzare la capacità della Norvegia di sorveglianza marittima dimostrando la validità di una nuova tecnologia." },
  { name: "DEIMOS-1", noradId: 35681, description: "È un piccolo satellite di osservazione della Terra, che fa parte della Disaster Monitoring Constellation (DMC). Il satellite fornisce immagini per applicazioni commerciali, per uso governativo e per risposte rapide in seguito a disastri." },
  { name: "TDRS11", noradId: 39070, description: "È un satellite di comunicazione americano che fa parte del Tracking and Data Relay Satellite System operato dalla NASA. Il satellite TDRS 11 è il primo satellite di terza generazione." }
];
// Funzione per aggiornare i dati dei satelliti con informazioni aggiuntive dai dati TLE
async function updateSatellitesData() {
  let updatedSatellitesData = {};

  for (const satellite of satellites) {
    const tleData = await fetchTLE(satellite.noradId);
    
    if (tleData) {
      const satInfo = getSatelliteInfo(
        [tleData.line1, tleData.line2],
        Date.now(),
        34.243889,
        -116.911389,
        0
      );

      updatedSatellitesData[satellite.name] = {
        lng: satInfo.lng,
        lat: satInfo.lat,
        elevation: satInfo.elevation,
        azimuth: satInfo.azimuth,
        range: satInfo.range,
        height: satInfo.height,
        velocity: satInfo.velocity,
        // Aggiungi i dati mancanti dei satelliti
        noradId: satellite.noradId,
        description: satellite.description
      };
    }
  }
  
  satellitesData = updatedSatellitesData;
}


// Aggiornamento periodico dei dati dei satelliti ogni 10 minuti
setInterval(updateSatellitesData, 1000 * 60 * 10);
updateSatellitesData();

// Definizione delle route del server
server.get("/satellites/coordinates", async (req, res) => {
  await updateSatellitesData(); // Aggiorna i dati dei satelliti prima di inviarli
  res.json(Object.values(satellitesData)); // Invia solo i valori degli oggetti come array
});

server.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (
    typeof req.body.email == "undefined" &&
    typeof req.body.password == "undefined"
  ) {
    res.status(400).json({ error: "Please enter valid data" });
  } else {
    if (await prisma.user.findUnique({ where: { email } })) {
      res.status(400).json({ error: "The account already exists, try to login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          password: hashedPassword,
          email: email,
        },
      });
      res.status(200);
    }
  }
});

server.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, "mysecret");
  res.json({ token });
});

// Avvio del server in ascolto sulla porta specificata
server.listen(PORT, () => {
  console.log(`Server Express in ascolto su http://localhost:${PORT}`);
});