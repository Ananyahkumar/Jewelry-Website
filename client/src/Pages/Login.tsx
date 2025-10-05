/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // Tailwind CSS styles for the login form
  // You can also extract these to a separate className variable if preferred
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", formData);
      
      // Store JWT token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Set default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      navigate("/home");
      console.log("Login successful, token stored");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMessage);
    }
  };
  const formClass =
    "max-w-md mx-auto mt-24 p-10 rounded-2xl shadow-2xl flex flex-col gap-6 border border-blue-100";
  const inputClass =
    "border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700 bg-gray-50 placeholder-gray-400";
  const buttonClass =
    "bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition-colors font-semibold shadow-md mt-2";
  const headingClass =
    "text-3xl font-bold text-center text-blue-700 mb-4 tracking-tight";
  const linkClass =
    "text-blue-600 hover:underline font-medium";
  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <h2 className={headingClass}>Login | Jewelry.com</h2>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={inputClass}
        autoComplete="email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className={inputClass}
        autoComplete="current-password"
      />
      <button type="submit" className={buttonClass}>
        Login
      </button>
      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/Register" className={linkClass}>
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
