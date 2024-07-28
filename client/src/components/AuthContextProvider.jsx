import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { "x-auth-token": token },
          });
          setUser(res.data);
          localStorage.setItem('user_id', res.data._id);
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
        }
      }
    };

    loadUser();
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      const userRes = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { "x-auth-token": res.data.token },
      });
      setUser(userRes.data);
      localStorage.setItem('user_id', userRes.data._id);
      navigate("/stores");
    } catch (err) {
      console.error("Login error:", err.response.data);
      throw new Error(err.response.data.msg || "Invalid credentials");
    }
  };

  const register = async (formData, navigate) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      localStorage.setItem("token", res.data.token);
      const userRes = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { "x-auth-token": res.data.token },
      });
      setUser(userRes.data);
      localStorage.setItem('user_id', userRes.data._id);
      navigate("/stores");
    } catch (err) {
      console.error("Registration error:", err.response.data);
      throw new Error(err.response.data.msg || "Registration failed");
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem('user_id');
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
