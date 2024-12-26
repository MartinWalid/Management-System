import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase.js";

export default function Register({ onComplete, onCancel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onComplete();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-animated-gradient from-blue-500 to-purple-600 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="register-email" className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="register-email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="register-password" className="block text-sm font-medium text-gray-100 mb-1">
            Password
          </label>
          <input
            type="password"
            id="register-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Register
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-4 w-full text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
