import React, {useState} from "react";
import api from "../api/axios.js";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-950 to-black px-4">
      <div className="bg-gray-900/30 backdrop-blur-xl shadow-[0_0_60px_rgba(128,0,255,0.5)] rounded-3xl p-10 w-full max-w-md border border-gray-700/50">
        <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-wider drop-shadow-md">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 bg-red-800/30 py-2 rounded-lg animate-pulse">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition duration-300 shadow-[0_0_15px_rgba(128,0,255,0.4)]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition duration-300 shadow-[0_0_15px_rgba(128,0,255,0.4)]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition duration-300 shadow-[0_0_15px_rgba(128,0,255,0.4)]"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-purple-700 via-purple-500 to-indigo-600 text-white font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:underline hover:text-indigo-400 transition-colors"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
