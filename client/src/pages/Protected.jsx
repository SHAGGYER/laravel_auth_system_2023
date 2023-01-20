import React from "react";

export default function Protected() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <div>
      <h1>This is a protected page!</h1>

      <button onClick={logout} className="p-4 bg-green-500">
        Logout
      </button>
    </div>
  );
}
