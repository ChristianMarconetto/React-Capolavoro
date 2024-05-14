import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import EarthPage from "./pages/Sat";
import ApiRefused from "./pages/ApiRefused";

function withAuth(Component) {
  return function ProtectedRoute(props) {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Login />;
    }
    return <Component {...props} />;
  };
}

const EarthPageWithAuth = withAuth(EarthPage);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
    };
  }

  componentDidMount() {
    const ws = new WebSocket("ws://localhost:5000");
    this.setState({ ws });
    ws.onopen = () => {
      console.log("Connesso al WebSocket");
    };
    ws.onmessage = (event) => {
      console.log("Ricevuto un messaggio: ", event.data);
      const message = JSON.parse(event.data);
      if (message.type === "refresh") {
        // Ricarica la pagina
        window.location.reload();
      } else if (message.type === "api-refused") {
        // Reindirizza l'utente alla pagina di attesa
        window.location.href = "/ApiRefused";
      }
    };
    ws.onerror = (error) => {
      console.log("Errore WebSocket: ", error);
    };
    ws.onclose = () => {
      console.log("Connessione WebSocket chiusa");
    };
  }

  componentWillUnmount() {
    if (this.state.ws) {
      this.state.ws.close();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sat" element={<EarthPageWithAuth />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="apiRefused" element={<ApiRefused />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App />);
