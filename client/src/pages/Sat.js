import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Text, Billboard } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SunCalc from "suncalc";
import { TextureLoader } from "three";
import axios from "axios";
const SCALE_FACTOR = 1;
function SatelliteDataMenu({ satellites, setSelectedSatellite }) {
  const [selectedSatellite, setLocalSelectedSatellite] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const satelliteName = event.target.value;
    setLocalSelectedSatellite(satelliteName);
    setSelectedSatellite(satellites[satelliteName]);
  };

  const stats = Object.entries(satellites).length
    ? Object.entries(satellites).reduce(
        (acc, [name, { latitude, longitude, altitude }]) => {
          acc.latitudes.push({ name, value: latitude });
          acc.longitudes.push({ name, value: longitude });
          acc.altitudes.push({ name, value: altitude });
          return acc;
        },
        { latitudes: [], longitudes: [], altitudes: [] }
      )
    : { latitudes: [], longitudes: [], altitudes: [] };

  const average = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b.value, 0) / arr.length : 0;
  const min = (arr) =>
    arr.length
      ? arr.reduce((a, b) => (a.value < b.value ? a : b))
      : { name: "", value: 0 };
  const max = (arr) =>
    arr.length
      ? arr.reduce((a, b) => (a.value > b.value ? a : b))
      : { name: "", value: 0 };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          color: "black",
          border: "none",
          padding: "10px 20px",
        }}
      >
        {isOpen ? "Close" : "Open"}
      </button>
      <div
        style={{
          position: "fixed",
          right: isOpen ? 0 : "-100%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "50%",
          height: "100%",
          overflow: "hidden",
          transition: "right 0.5s",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "20px",
        }}
      >
        <select value={selectedSatellite} onChange={handleChange}>
          <option value="">Seleziona un satellite</option>
          {Object.keys(satellites).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {selectedSatellite && (
          <div>
            <h2>{selectedSatellite}</h2>
            <p>
              <strong>Latitudine:</strong>{" "}
              {satellites[selectedSatellite].latitude}
            </p>
            <p>
              <strong>Longitudine:</strong>{" "}
              {satellites[selectedSatellite].longitude}
            </p>
            <p>
              <strong>Altitudine:</strong>{" "}
              {satellites[selectedSatellite].altitude}
            </p>
          </div>
        )}
        <div>
          <h2>Statistiche dei satelliti</h2>
          <p>
            <strong>Numero totale di satelliti:</strong>{" "}
            {Object.keys(satellites).length}
          </p>
          <p>
            <strong>Media latitudine:</strong> {average(stats.latitudes)}
          </p>
          <p>
            <strong>Minima latitudine:</strong> {min(stats.latitudes).value} (
            {min(stats.latitudes).name})
          </p>
          <p>
            <strong>Massima latitudine:</strong> {max(stats.latitudes).value} (
            {max(stats.latitudes).name})
          </p>
          <p>
            <strong>Media longitudine:</strong> {average(stats.longitudes)}
          </p>
          <p>
            <strong>Minima longitudine:</strong> {min(stats.longitudes).value} (
            {min(stats.longitudes).name})
          </p>
          <p>
            <strong>Massima longitudine:</strong> {max(stats.longitudes).value}{" "}
            ({max(stats.longitudes).name})
          </p>
          <p>
            <strong>Media altitudine:</strong> {average(stats.altitudes)}
          </p>
          <p>
            <strong>Minima altitudine:</strong> {min(stats.altitudes).value} (
            {min(stats.altitudes).name})
          </p>
          <p>
            <strong>Massima altitudine:</strong> {max(stats.altitudes).value} (
            {max(stats.altitudes).name})
          </p>
        </div>
      </div>
    </>
  );
}

function Sidebar({ satellite, handleClose }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "20px",
          transition: "transform 0.3s ease-in-out",
          transform: satellite ? "translateX(0)" : "translateX(100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            color: "white",
            background: "transparent",
            border: "none",
            fontSize: "1.5em",
          }}
        >
          ×
        </button>
        {satellite && (
          <>
            <h2
              style={{
                borderBottom: "1px solid white",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              {satellite.name}
            </h2>
            <p>
              <strong>Norad ID:</strong> {satellite.noradId}
            </p>
            <p>
              <strong>Latitude:</strong> {satellite.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {satellite.lng}
            </p>
            <p>
              <strong>Altitude:</strong> {satellite.alt}
            </p>
            <p>
              <strong>Range:</strong> {satellite.range}
            </p>
            <p>
              <strong>Velocity:</strong> {satellite.velocity}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {satellite.description
                .split(/\. (?=[A-Z])/)
                .map((sentence, index) => (
                  <p key={index}>{sentence.trim()}</p>
                ))}
            </p>
          </>
        )}
      </div>
    </>
  );
}

function Earth() {
  const earthRef = useRef();
  const colorMap = new TextureLoader().load("/earth.jpg");
  useEffect(() => {
    earthRef.current.rotation.y += 0.001;
  }, []);
  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 50, 50]} />
      <meshPhongMaterial map={colorMap} />
    </mesh>
  );
}
function Sun() {
  const sunRef = useRef();
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const gltfResult = await new GLTFLoader().loadAsync("/sunObject.glb");
      setGltf(gltfResult);
    };

    loadModel();

    return () => {
      setGltf(null);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sunRef.current && gltf) {
        const now = new Date();
        const sunPos = SunCalc.getPosition(now, 41.9, 12.5);
        const sunX = 50 * Math.cos(sunPos.azimuth) * Math.cos(sunPos.altitude);
        const sunY = 50 * Math.sin(sunPos.altitude);
        const sunZ = 50 * Math.sin(sunPos.azimuth) * Math.cos(sunPos.altitude);
        sunRef.current.position.set(
          sunX * 10 * SCALE_FACTOR,
          sunY * 10 * SCALE_FACTOR,
          sunZ * 10 * SCALE_FACTOR
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gltf]);

  return (
    <group
      ref={sunRef}
      scale={[SCALE_FACTOR * 100, SCALE_FACTOR * 100, SCALE_FACTOR * 100]}
    >
      {gltf && (
        <>
          <primitive object={gltf.scene.clone()} />
          <Billboard>
            <Text fontSize={0.2} color="white">
              Sun
            </Text>
          </Billboard>
        </>
      )}
    </group>
  );
}

function Moon() {
  const moonRef = useRef();
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const gltfResult = await new GLTFLoader().loadAsync("/moonObject.glb");
      setGltf(gltfResult);
    };

    loadModel();

    return () => {
      setGltf(null);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (moonRef.current && gltf) {
        const now = new Date();
        const moonPos = SunCalc.getMoonPosition(now, 41.9, 12.5);
        const moonX = Math.cos(moonPos.azimuth) * Math.cos(moonPos.altitude);
        const moonY = Math.sin(moonPos.altitude);
        const moonZ = Math.sin(moonPos.azimuth) * Math.cos(moonPos.altitude);
        moonRef.current.position.set(
          moonX * 5 * SCALE_FACTOR,
          moonY * 5 * SCALE_FACTOR,
          moonZ * 5 * SCALE_FACTOR
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gltf]);

  return (
    <group ref={moonRef} scale={[SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR]}>
      {gltf && (
        <>
          <primitive object={gltf.scene.clone()} />
          <Billboard></Billboard>
        </>
      )}
    </group>
  );
}

function Satellite({
  name,
  lat,
  lng,
  alt,
  description,
  noradId,
  range,
  velocity,
  setSelectedSatellite,
  sunPosition,
}) {
  const satelliteRef = useRef();
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const gltfResult = await new GLTFLoader().loadAsync(
        "/low-polyish_satellite.glb"
      );
      setGltf(gltfResult);
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (satelliteRef.current && gltf) {
      const radius = 1 + alt / 500;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      satelliteRef.current.position.set(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );

      satelliteRef.current.up.set(...sunPosition);
      satelliteRef.current.lookAt(...sunPosition);
      satelliteRef.current.rotateX(Math.PI / 2);
    }
  }, [lat, lng, alt, gltf, sunPosition]);

  const handleClick = () => {
    setSelectedSatellite({
      name,
      lat,
      lng,
      alt,
      description,
      noradId,
      range,
      velocity,
    });
  };

  return (
    <group ref={satelliteRef} onClick={handleClick}>
      {gltf && (
        <>
          <primitive object={gltf.scene.clone()} scale={0.01} />{" "}
          <Billboard>
            <Text position={[0, 0.1, 0]} fontSize={0.1} color="white">
              {name}
            </Text>
          </Billboard>
        </>
      )}
    </group>
  );
}

function EarthPage() {
  const [sunPosition, setSunPosition] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const sunPos = SunCalc.getPosition(now, 41.9, 12.5);
      const sunX = Math.cos(sunPos.azimuth) * Math.cos(sunPos.altitude);
      const sunY = Math.sin(sunPos.altitude);
      const sunZ = Math.sin(sunPos.azimuth) * Math.cos(sunPos.altitude);
      setSunPosition([sunX * 10, sunY * 10, sunZ * 10]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [satellites, setSatellites] = useState({});
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  useEffect(() => {
    async function fetchSatellites() {
      try {
        const response = await axios.get(
          "http://localhost:5000/satellites/coordinates"
        );
        const satellitesData = response.data;
        console.log("Response.data =", response.data);
        const formattedSatellites = satellitesData.reduce((acc, satellite) => {
          acc[satellite.name] = {
            azimuth: satellite.azimuth,
            description: satellite.description,
            altitude: satellite.elevation,
            latitude: satellite.lat,
            longitude: satellite.lng,
            height: satellite.height,
            name: satellite.name,
            noradId: satellite.noradId,
            range: satellite.range,
            velocity: satellite.velocity,
          };
          return acc;
        }, {});
        console.log("formattedData", formattedSatellites);
        setSatellites(formattedSatellites);
      } catch (error) {
        console.error(
          "Errore durante l'acquisizione dei dati dei satelliti:",
          error
        );
      }
    }

    fetchSatellites();
  }, []);

  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
    "magenta",
    "lime",
  ];

  const handleClose = () => {
    setSelectedSatellite(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={10.5} position={sunPosition} />
        <Stars
          radius={100}
          depth={500}
          count={50000}
          factor={5}
          saturation={0}
          fade
        />
        <Earth />
        <Moon />
        <Sun />
        {Object.keys(satellites).map((name, index) => (
          <Satellite
            key={name}
            name={name}
            lat={satellites[name].latitude}
            lng={satellites[name].longitude}
            alt={satellites[name].height}
            description={satellites[name].description}
            noradId={satellites[name].noradId}
            range={satellites[name].range}
            velocity={satellites[name].velocity}
            color={colors[index % colors.length]}
            setSelectedSatellite={setSelectedSatellite}
            sunPosition={sunPosition}
          />
        ))}
        <OrbitControls />
      </Canvas>
      <Sidebar satellite={selectedSatellite} handleClose={handleClose} />
      <SatelliteDataMenu
        satellites={satellites}
        setSelectedSatellite={setSelectedSatellite}
      />
    </div>
  );
}

export default EarthPage;
