// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../Authcontext';
// import { useNavigate, Link, useLocation } from 'react-router';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const { loginUser, loginWithGoogle, theme } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     setLoading(true);
//     try {
//       await loginUser(email, password);
//       toast.success("Login successful!");
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await loginWithGoogle();
//       toast.success("Google login successful!");
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message || "Google login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.section
//       className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 bg-[#d0ff00]`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <motion.h2
//         className={`text-6xl md:text-8xl font-bold uppercase ${
//           theme === "dark" ? "text-[#92afcf]" : "text-indigo-600"
//         }`}
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         AI Verse
//       </motion.h2>

//       <motion.fieldset
//         className={`rounded-lg w-full max-w-sm p-6 shadow-lg ${
//           theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
//         }`}
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 1, delay: 0.3 }}
//       >
//         <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
//           <label>Email</label>
//           <input
//             name="email"
//             type="email"
//             className="p-3 rounded-lg border outline-none"
//             required
//           />

//           <label>Password</label>
//           <input
//             name="password"
//             type="password"
//             className="p-3 rounded-lg border outline-none"
//             required
//           />

//           <button
//             className={`mt-4 p-3 rounded-lg font-semibold ${
//               theme === "dark"
//                 ? "bg-indigo-500 hover:bg-indigo-600"
//                 : "bg-indigo-600 hover:bg-indigo-700 text-white"
//             } transition`}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <button
//           onClick={handleGoogleLogin}
//           className={`mt-4 w-full p-3 rounded-lg border font-semibold ${
//             theme === "dark"
//               ? "border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
//               : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
//           } transition`}
//           disabled={loading}
//         >
//           {loading ? "Please wait..." : "Continue with Google"}
//         </button>

//         <div className="mt-4 text-center">
//           <Link
//             to="/forgot-password"
//             className="text-sm underline hover:text-indigo-400"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         <p className="mt-2 text-center text-sm">
//           New here?{" "}
//           <Link
//             to="/register"
//             className="font-semibold underline hover:text-indigo-500"
//           >
//             Create an account
//           </Link>
//         </p>
//       </motion.fieldset>
//     </motion.section>
//   );
// };

// export default Login;

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Authcontext';
import { useNavigate, Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("ACCESS GRANTED");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("IDENTIFICATION FAILED");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("ACCESS GRANTED");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("IDENTIFICATION FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#f4f4e8] font-sans flex flex-col lg:flex-row overflow-hidden text-black">
      
      {/* LEFT SIDE: Brand Impact */}
      <div className="flex-1 relative flex flex-col justify-between p-10 md:p-16 border-r border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#d0ff00]" />
          <span className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase text-gray-500">
            System Auth v2.0
          </span>
        </div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-[9vw] font-sans font-black leading-[0.8] tracking-tighter uppercase mb-6">
            AI <br />
            <span className="text-[#d0ff00] italic humane-font font-light">MANIA..</span>
          </h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-xs">
            Enter your credentials to synchronize with the neural network.
          </p>
        </motion.div>

        <div className="text-[9px] font-mono text-gray-700 uppercase tracking-widest">
          Node ID: 882-KYMA // Security Level: 04
        </div>
      </div>

      {/* RIGHT SIDE: Terminal Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20 relative">
        {/* Technical Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="h-full w-[1px] bg-black absolute left-1/3" />
          <div className="h-full w-[1px] bg-black absolute left-2/3" />
          <div className="w-full h-[1px] bg-black absolute top-1/2" />
        </div>

        <motion.div 
          className="w-full max-w-md z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleEmailLogin} className="space-y-8">
            <div className="group relative border-b border-black/10 focus-within:border-[#d0ff00] transition-colors">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2 group-focus-within:text-[#d0ff00]">
                Email Address_
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-transparent py-4 outline-none text-xl font-bold tracking-tight text-white placeholder:text-gray-800"
                placeholder="USER@NETWORK.COM"
              />
            </div>

            <div className="group relative border-b border-white/10 focus-within:border-[#d0ff00] transition-colors">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-focus-within:text-[#d0ff00]">
                  Security Key_
                </label>
                <Link to="/forgot-password" title="Recover Access" className="text-[9px] text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
                  Lost Access?
                </Link>
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-transparent py-4 outline-none text-xl font-bold tracking-tight text-white placeholder:text-gray-800"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <button
                disabled={loading}
                className="group relative flex items-center justify-between border border-[#d0ff00] p-6 hover:bg-[#d0ff00] transition-all duration-500"
              >
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#d0ff00] group-hover:text-black">
                  {loading ? "Verifying..." : "Initialize Session"}
                </span>
                <div className="w-2 h-2 bg-[#d0ff00] group-hover:bg-black transition-colors" />
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center gap-4 border border-white/10 p-6 text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                {loading ? "Verifying..." : "Continue with Google Network"}
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Unauthorized access is logged. {" "}
            <Link to="/register" className="text-white hover:text-[#d0ff00] underline underline-offset-4">
              Create New Identity
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
