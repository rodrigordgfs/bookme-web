import { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(savedUser, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } catch (error) {
        console.error("Erro ao descriptografar os dados do usuário", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        SECRET_KEY
      ).toString();
      localStorage.setItem("user", encryptedUser);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
