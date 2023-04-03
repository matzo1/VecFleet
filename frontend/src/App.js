import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//se importa el componente
import AddVehiculo from "./components/AddVehiculo";
import ModVehiculo from "./components/ModVehiculo";
import ShowVehiculo from "./components/ShowVehiculo";

function App() {
  return (
    <div className="App">
      <nav
        className="navbar"
        data-bs-theme="dark"
        style={{ backgroundColor: "#591987" }}
      >
        <div className="container-md">
          <span className="navbar-brand h1" style={{ color: "white" }}>
            <b>VEHICULOS</b>
          </span>
        </div>
      </nav>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowVehiculo />} />
            <Route path="/add" element={<AddVehiculo />} />
            <Route path="/mod/:id" element={<ModVehiculo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
