import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "./../constants/api";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShowVehiculo = () => {
  const [id_modelo, setIdModelo] = useState("");
  const [id_marca, setIdMarca] = useState("");
  const [ArrayMarcas, setArrayMarcas] = useState([]);
  const [ArrayModelos, setArrayModelos] = useState([]);
  const [ArrayModelosMarca, setArrayModelosMarca] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    getVehiculoAll();
    getMarcasAll();
    getModelosAll();
  }, []);
  const getVehiculoAll = async () => {
    const response = await axios.get(`${ENDPOINT}/vehiculo`, {
      params: {
        id_marca: id_marca,
        id_modelo: id_modelo,
      },
    });
    setVehiculos(response.data);
  };

  const deleteVehiculo = async (id) => {
    await axios.delete(`${ENDPOINT}/vehiculo/${id}`);
    getVehiculoAll();
  };
  const handleMarcasModelos = (idMarca) => {
    setIdMarca(idMarca);
    setArrayModelosMarca(
      ArrayModelos.filter((item) => item.id_marca == idMarca)
    );
  };
  const getMarcasAll = async () => {
    const response = await axios.get(`${ENDPOINT}/marca`);
    setArrayMarcas(response.data);
  };

  const getModelosAll = async () => {
    const response = await axios.get(`${ENDPOINT}/modelo`);
    setArrayModelos(response.data);
  };

  return (
    <div>
      <div className="crud shadow-lg p-0 mb-2 mt-2 bg-body rounded">
        <div className="row ">
          <div
            className="col-xs-12 mt-1 mb-1 text-gred"
            style={{ color: "#591987" }}
          >
            <h2>Listado</h2>
          </div>
          <div className="col-sm-4 text-gred">
            <label className="form-label">
              Marcas
              <select
                value={id_marca}
                onChange={(e) => {
                  console.log(e.target.value);
                  handleMarcasModelos(e.target.value);
                }}
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
          <div className="col-sm-4 text-gred">
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
          <div className="col-sm-1 mt-3">
            <button
              onClick={() => getVehiculoAll()}
              className="btn btn-primary text-white"
            >
              Filtrar
            </button>
          </div>
          <div className="col-sm-1 mt-3">
            <button
              onClick={() => {
                setIdModelo("");
                setIdMarca("");
              }}
              className="btn btn-primary text-white"
            >
              Limpiar
            </button>
          </div>
          <div className="col-sm-2 mt-3 text-gred">
            <Link to="/add" className="btn btn-success btn text-white">
              Agregar
            </Link>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead
          className="text-white"
          style={{ backgroundColor: "rgb(1, 215, 207)" }}
        >
          <tr>
            <th>Patente</th>
            <th>Numero Chasis</th>
            <th>Tipo de Vehiculo</th>
            <th>Cantidad de Ruedas</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Kilometraje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.patente}</td>
              <td>{vehiculo.numero_chasis}</td>
              <td>{vehiculo.tipo_vehiculo.descripcion}</td>
              <td>{vehiculo.cantidad_ruedas}</td>
              <td>{vehiculo.marca.descripcion}</td>
              <td>{vehiculo.modelo.descripcion}</td>
              <td>{vehiculo.kilometraje}</td>
              <td>
                <Link to={`/mod/${vehiculo.id}`} className="btn btn-warning">
                  <FaRegEdit />
                </Link>
                <button
                  onClick={() => deleteVehiculo(vehiculo.id)}
                  className="btn btn-danger"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowVehiculo;
