import axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post("/api/auth/register", newUser);
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        setError(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Register</h1>

      {error && (
        <div
          className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{JSON.stringify(error)}</span>
        </div>
      )}

      <form className="flex flex-col gap-4 items-start" onSubmit={onSubmit}>
        <input
          className="p-4 border border-gray-400"
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={handleUserChange}
        />
        <input
          className="p-4 border border-gray-400"
          type="text"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleUserChange}
        />
        <input
          type="password"
          className="p-4 border border-gray-400"
          placeholder="Password"
          name="password"
          value={newUser.password}
          onChange={handleUserChange}
        />
        <input
          type="password"
          className="p-4 border border-gray-400"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={newUser.confirmPassword}
          onChange={handleUserChange}
        />
        <button className="p-4 bg-green-400" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
