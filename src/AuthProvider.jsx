
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from './firebase.init';
import { AuthContext } from './Authcontext';
import { toast } from 'react-toastify';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [modelData, setModelData] = useState([]);
  const [buyerData, setBuyerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyerLoading, setBuyerLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // -------------------- Auth functions --------------------
  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
      return userCredential;
    } catch (error) {
      toast.error(error.message || "Registration failed!");
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      return userCredential;
    } catch (error) {
      toast.error(error.message || "Login failed!");
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      return userCredential;
    } catch (error) {
      toast.error(error.message || "Google login failed!");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message || "Logout failed!");
    }
  };

  // -------------------- Auth State --------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // -------------------- Fetch Buyer Data --------------------
  useEffect(() => {
    const fetchBuyerData = async () => {
      setBuyerLoading(true);
      try {
        const res = await fetch('https://server-3-smoky.vercel.app/buyerdata');
        if (!res.ok) throw new Error("Failed to fetch buyer data");
        const data = await res.json();
        setBuyerData(data);
        toast.success("Buyer data loaded successfully!");
      } catch (err) {
        toast.error(err.message || "Error loading buyer data");
      } finally {
        setBuyerLoading(false);
      }
    };
    fetchBuyerData();
  }, []);

  // -------------------- Fetch Model Data --------------------
  useEffect(() => {
    const fetchModelData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://server-3-smoky.vercel.app/users');
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();
        setModelData(data);
        toast.success("Model data loaded successfully!");
      } catch (err) {
        toast.error(err.message || "Error loading models");
      } finally {
        setLoading(false);
      }
    };
    fetchModelData();
  }, []);

  const value = {
    user,
    setUser,
    createUser,
    loginUser,
    loginWithGoogle,
    logout,
    modelData,
    loading,
    buyerData,
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
