import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase.js";
import Register from "./Register.jsx";

export default function LoginUser({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // Toggle state for Register view

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  // If "showRegister" is true, display the Register component
  if (showRegister) {
    return (
      <Register
        onComplete={() => setShowRegister(false)} // Go back to Login after successful registration
        onCancel={() => setShowRegister(false)} // Go back to Login when "Cancel" is clicked
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-animated-gradient from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-semibold text-center text-stone-900 mb-6">
          Login
        </h2>
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm font-bold animate-shake">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-stone-900 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-stone-900 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:scale-105 transform transition-transform duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-stone-900">Don't have an account?</p>
        {/* <button
          onClick={() => setShowRegister(true)}
          className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:scale-110 transform transition-transform duration-300"
        >
          Register
        </button> */}
      </div>
    </div>
  );
}