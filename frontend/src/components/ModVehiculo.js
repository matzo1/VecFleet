import axios from "axios";
import React, { useState, useEffect } from "react";
import { ENDPOINT } from "./../constants/api";
import { useNavigate, useParams } from "react-router-dom";

const ModVehiculo = () => {
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
  const { id } = useParams();

  const modificar = async (e) => {
    e.preventDefault();
    await axios.put(`${ENDPOINT}/vehiculo/${id}`, {
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

  const handleMarcasModelos = (idMarca) => {
    setIdMarca(idMarca);
    setArrayModelosMarca(
      ArrayModelos.filter((item) => item.id_marca == idMarca)
    );
  };
  const getTipoVehiculoAll = async () => {
    const response = await axios.get(`${ENDPOINT}/tipoVehiculo`);
    setArrayTipoVehiculo(response.data);
  };
  const getMarcasAll = async () => {
    const response = await axios.get(`${ENDPOINT}/marca`);
    setArrayMarcas(response.data);
  };

  const getModelosAll = async () => {
    const response = await axios.get(`${ENDPOINT}/modelo`);
    setArrayModelos(response.data);
  };
  useEffect(() => {
    const getVehiculoById = async () => {
      const response = await axios.get(`${ENDPOINT}/vehiculo/${id}`);
      setCantidadRueda(response.data.cantidad_ruedas);
      setNumeroChasis(response.data.numero_chasis);
      setIdTipoVehiculo(response.data.id_tipo_vehiculo);
      setIdModelo(response.data.id_modelo);
      setIdMarca(response.data.id_marca);
      setPatente(response.data.patente);
      setKilometraje(response.data.kilometraje);
    };

    getMarcasAll();
    getModelosAll();
    getTipoVehiculoAll();
    getVehiculoById();
  }, []);
  return (
    <div>
      <h3>Modificar Vehiculo</h3>
      <form onSubmit={modificar} className="row g-3">
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

export default ModVehiculo;
