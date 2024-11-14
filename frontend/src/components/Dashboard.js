import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      // Si no hay token, redirigir al login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token de localStorage y redirigir al login
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600 text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-max-[80%] w-fit">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Dashboard
        </h2>
        {token ? (
          <div>
            <h3 className="text-xl font-semibold text-black mb-4">Tu Token:</h3>
            <p className="text-black mb-4">{token}</p>
            <h2 className="text-gray-400 text-center mb-8">
              Este texto se muestra solo a modo de ejemplificar que se logró
              acceder a la cuenta. Aquí cargarían los distintos recursos del
              usuario.
            </h2>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <p>No has iniciado sesión</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
