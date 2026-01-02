import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Authcontext';
import { useNavigate, Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { loginUser, loginWithGoogle, theme } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 bg-[#d0ff00]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className={`text-6xl md:text-8xl font-bold uppercase ${
          theme === "dark" ? "text-[#92afcf]" : "text-indigo-600"
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        AI Verse
      </motion.h2>

      <motion.fieldset
        className={`rounded-lg w-full max-w-sm p-6 shadow-lg ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="p-3 rounded-lg border outline-none"
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            className="p-3 rounded-lg border outline-none"
            required
          />

          <button
            className={`mt-4 p-3 rounded-lg font-semibold ${
              theme === "dark"
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            } transition`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className={`mt-4 w-full p-3 rounded-lg border font-semibold ${
            theme === "dark"
              ? "border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
              : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          } transition`}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm underline hover:text-indigo-400"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="mt-2 text-center text-sm">
          New here?{" "}
          <Link
            to="/register"
            className="font-semibold underline hover:text-indigo-500"
          >
            Create an account
          </Link>
        </p>
      </motion.fieldset>
    </motion.section>
  );
};

export default Login;
