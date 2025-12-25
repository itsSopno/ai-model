import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import auth from './firebase.init';
import { AuthContext } from './Authcontext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [modelData, setModelData] = useState([]);
  const [buyerdata, setBuyerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyerLoading, setBuyerLoading] = useState(true);
 const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch('https://server-3-smoky.vercel.app/buyerdata')
      .then(res => res.json())
      .then(data => {
        setBuyerData(data);
        setBuyerLoading(false);
      })
      .catch(() => setBuyerLoading(false));
  }, []);

  useEffect(() => {
    fetch('https://server-3-smoky.vercel.app/users')
      .then(res => res.json())
      .then(data => {
        setModelData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const value = {
    user,
    setUser,
    createUser,
    logout, // ✅ Added logout function
    modelData,
    loading,
    buyerdata,
    buyerLoading,
    theme,
    setTheme
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
