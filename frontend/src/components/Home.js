import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a la Aplicación</h1>
      <h2 className="mb-8">Test de comunicación API-Cliente</h2>
      <div className="space-y-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 m-2 text-lg bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 m-2 text-lg bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Home;
