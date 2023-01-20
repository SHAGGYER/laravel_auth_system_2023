import { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Protected from "./pages/Protected";
import { useEffect } from "react";
import Login from "./pages/Login";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/auth/init", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(data.user);
  };

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {!user ? (
        <Routes>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Protected />} />
        </Routes>
      )}
    </AppContext.Provider>
  );
}

export default App;
