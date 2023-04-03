import axios from "axios";
import React, { useState, useEffect } from "react";
import { ENDPOINT } from "./../constants/api";
import { useNavigate } from "react-router-dom";

const endpoint = "http://127.0.0.1:8000/api/vehiculo";
const endpointTipo = "http://127.0.0.1:8000/api/tipoVehiculo";
const endpointModelo = "http://127.0.0.1:8000/api/modelo";
const endpointMarca = "http://127.0.0.1:8000/api/marca";

const AddVehiculo = () => {
  const [cantidad_ruedas, setCantidadRueda] = useState("");
  const [numero_chasis, setNumeroChasis] = useState("");
  const [id_tipo_vehiculo, setIdTipoVehiculo] = useState("");
  const [id_modelo, setIdModelo] = useState("");
  const [id_marca, setIdMarca] = useState("");
  const [patente, setPatente] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [ArrayTipoVehiculo, setArrayTipoVehiculo] = useState([]);
  const [ArrayMarcas, setArrayMarcas] = useState([]);
  const [ArrayModelos, setArrayModelos] = useState([]);
  const [ArrayModelosMarca, setArrayModelosMarca] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTipoVehiculoAll();
    getMarcasAll();
    getModelosAll();
  }, []);

  const store = async (e) => {
    e.preventDefault();
    await axios.post(`${ENDPOINT}/vehiculo`, {
      cantidad_ruedas: cantidad_ruedas,
      numero_chasis: numero_chasis,
      id_tipo_vehiculo: id_tipo_vehiculo,
      id_modelo: id_modelo,
      id_marca: id_marca,
      kilometraje: kilometraje,
      patente: patente,
    });
    navigate("/");
  };
  const getTipoVehiculoAll = async () => {
    const response = await axios.get(`${ENDPOINT}/tipoVehiculo`);
    setArrayTipoVehiculo(response.data);
  };
  const getMarcasAll = async () => {
    const response = await axios.get(`${ENDPOINT}/marca`);
    setArrayMarcas(response.data);
  };
  const handleMarcasModelos = (idMarca) => {
    setIdMarca(idMarca);
    setArrayModelosMarca(
      ArrayModelos.filter((item) => item.id_marca == idMarca)
    );
  };

  const getModelosAll = async () => {
    const response = await axios.get(`${ENDPOINT}/modelo`);
    setArrayModelos(response.data);
  };
  return (
    <div>
      <h3>Agregar nuevo vehiculo</h3>
      <form onSubmit={store} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">
            Patente
            <input
              value={patente}
              onChange={(e) => setPatente(e.target.value)}
              type="text"
              className="form-control"
            />
          </label>
        </div>
        <div className="col-md-4">
          <label className="form-label">
            Numero de Chasis
            <input
              value={numero_chasis}
              onChange={(e) => setNumeroChasis(e.target.value)}
              type="text"
              className="form-control"
            />
          </label>
        </div>
        <div className="col-md-4">
          <label className="form-label">
            Cantidad de Ruedas
            <input
              value={cantidad_ruedas}
              onChange={(e) => setCantidadRueda(e.target.value)}
              type="number"
              className="form-control"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Kilometraje
            <input
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
              type="number"
              className="form-control"
            />
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Tipo de vehiculo
            <select
              value={id_tipo_vehiculo}
              onChange={(e) => setIdTipoVehiculo(e.target.value)}
              className="form-select mb-3"
            >
              {ArrayTipoVehiculo.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.descripcion}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Marcas
            <select
              value={id_marca}
              onChange={(e) => handleMarcasModelos(e.target.value)}
              className="form-select mb-3"
            >
              <option key={0} value={0}>
                seleccionar marca
              </option>
              {ArrayMarcas.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.descripcion}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Modelos
            <select
              value={id_modelo}
              onChange={(e) => setIdModelo(e.target.value)}
              className="form-select mb-3"
            >
              <option key={0} value={0}>
                seleccionar modelo
              </option>
              {ArrayModelosMarca.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.descripcion}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <button
            onClick={() => navigate("/")}
            type="button"
            className="btn btn-danger"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehiculo;
