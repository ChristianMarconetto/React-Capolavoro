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

const server = express();
expressWs(server);
server.ws("/", function (ws, req) {
  const userId = uuidv4();
  console.log("Received a new connection");
  clients[userId] = ws;
  console.log(`${userId} connected.`);
  ws.on("message", (message) => processReceivedMessage(message, userId));
  ws.on("close", () => handleClientDisconnection(userId));
});
const PORT = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());

let satellitesData = {};

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
// Chiamata alla funzione all'avvio del server
createTable();
async function updateSatellitesData() {
  const satellites = [
    { name: "ISS(ZARYA)", noradId: 25544 },
    { name: "PROXIMAI", noradId: 43694 },
    { name: "NORSAT1", noradId: 42826 },
    { name: "CENTAURI-3(TYVAK-0210)", noradId: 47966 },
    { name: "NOAA18", noradId: 28654 },
    { name: "ITASAT", noradId: 43786 },
    { name: "NORSAT2", noradId: 42828 },
    { name: "ZHUHAI-102(CAS-4B)", noradId: 42759 },
    { name: "AISSAT2", noradId: 40075 },
    { name: "KKS-1(KISEKI)", noradId: 33499 },
    { name: "NOAA19", noradId: 33591 },
    { name: "AISSAT1", noradId: 36797 },
    { name: "NOAA15", noradId: 25338 },
    { name: "CENTAURI-1", noradId: 43809 },
    { name: "PROXIMAII", noradId: 43696 },
    { name: "NORSAT3", noradId: 48272 },
    { name: "DEIMOS-1", noradId: 35681 },
    { name: "TDRS11", noradId: 39070 },
  ]; // la tua lista di satelliti
  const updatedSatellitesData = {};
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
        latitude: satInfo.lat,
        longitude: satInfo.lng,
        altitude: satInfo.height, // aggiungi una virgola qui
      };
    }
  }
  satellitesData = updatedSatellitesData;
}
setInterval(updateSatellitesData, 1000 * 60 * 10); // Aggiorna ogni 10 minuti
updateSatellitesData();
server.get("/satellites/coordinates", (req, res) => {
  res.json(satellitesData);
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
      res
        .status(400)
        .json({ error: "The account already exists, try to login" });
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
server.listen(PORT, () => {
  console.log(`Server Express in ascolto su http://localhost:${PORT}`);
});
