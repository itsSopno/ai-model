// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../Authcontext";
// import { useNavigate, Link } from "react-router";
// import { updateProfile } from "firebase/auth";
// import axios from "axios";

// const Register = () => {
//   const { createUser, loginWithGoogle } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [uploading, setUploading] = useState(false);

//   const imgbbKey = "4c8ddf7ff8e6cc2277a637b2f504274a";

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const imageFile = e.target.photo.files[0];

//     if (password.length < 6) {
//       setUploading(false);
//       return alert("Password must be at least 6 characters");
//     }

//     try {
//       // 🔵 Upload image to imgBB
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const imgRes = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
//         formData
//       );

//       const photoURL = imgRes.data.data.display_url;

//       // 🔵 Create Firebase user
//       const result = await createUser(email, password);

//       // 🔵 Update Firebase profile
//       await updateProfile(result.user, {
//         displayName: name,
//         photoURL
//       });

//       // 🔵 Save to backend
//       await fetch("https://server-3-smoky.vercel.app/data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           email,
//           photo: photoURL,
//           uid: result.user.uid
//         })
//       });

//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       alert("Registration failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  px-6">
//       <fieldset className="bg-[#92afcf] rounded-lg w-full max-w-md p-6 shadow-lg text-black">

//         <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

//         <form onSubmit={handleRegister} className="flex flex-col gap-3">

//           <input
//             name="name"
//             placeholder="Full Name"
//             className="input input-bordered bg-white"
//             required
//           />

//           <input
//             type="file"
//             name="photo"
//             accept="image/*"
//             className="file-input file-input-bordered bg-white"
//             required
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="input input-bordered bg-white"
//             required
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             className="input input-bordered bg-white"
//             required
//           />

//           <button
//             disabled={uploading}
//             className="btn btn-neutral mt-2"
//           >
//             {uploading ? "Creating Account..." : "Register"}
//           </button>
//         </form>

//         <button
//           onClick={loginWithGoogle}
//           className="btn btn-outline w-full mt-4"
//         >
//           Sign up with Google
//         </button>

//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-700 font-semibold underline">
//             Login
//           </Link>
//         </p>

//       </fieldset>
//     </div>
//   );
// };

// export default Register;
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authcontext";
import { useNavigate, Link } from "react-router";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const imgbbKey = "4c8ddf7ff8e6cc2277a637b2f504274a";

  const handleRegister = async (e) => {
    e.preventDefault();
    setUploading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const imageFile = e.target.photo.files[0];

    if (password.length < 6) {
      setUploading(false);
      return alert("SECURITY PROTOCOL: PASSWORD MINIMUM 6 CHARS");
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData);
      const photoURL = imgRes.data.data.display_url;

      const result = await createUser(email, password);
      await updateProfile(result.user, { displayName: name, photoURL });

      await fetch("https://server-3-smoky.vercel.app/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photo: photoURL, uid: result.user.uid })
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("PROVISIONING FAILED");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#080808] font-sans flex flex-col lg:flex-row overflow-hidden text-white">
      
      {/* LEFT SIDE: Brand & Identity Meta */}
      <div className="flex-1 relative flex flex-col justify-between p-10 md:p-16 border-r border-white/10 pt-32 lg:pt-16">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#d0ff00] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase text-gray-500">
            Identity Provisioning v2.0
          </span>
        </div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-[9vw] font-sans font-black leading-[0.8] tracking-tighter uppercase mb-6">
            New <br />
            <span className="text-[#d0ff00] italic font-light humane-font">HERE ?.</span>
          </h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-xs">
            Create a unique neural signature to access the AI Verse marketplace and ecosystem.
          </p>
        </motion.div>

        <div className="hidden lg:block text-[9px] font-mono text-gray-700 uppercase tracking-widest">
          Protocol: KYC_OPEN_NETWORK // Status: Awaiting Input
        </div>
      </div>

      {/* RIGHT SIDE: Provisioning Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20 relative bg-white/[0.01]">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="h-full w-[1px] bg-white absolute left-1/4" />
          <div className="h-full w-[1px] bg-white absolute left-3/4" />
          <div className="w-full h-[1px] bg-white absolute top-1/3" />
        </div>

        <motion.div 
          className="w-full max-w-md z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Field: Full Name */}
            <div className="group border-b border-white/10 focus-within:border-[#d0ff00] transition-colors">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Legal Name_</label>
              <input
                name="name"
                placeholder="FIRST LAST"
                className="w-full bg-transparent py-3 outline-none text-lg font-bold uppercase tracking-tight"
                required
              />
            </div>

            {/* Field: Photo Upload (Styled) */}
            <div className="group border-b border-white/10 focus-within:border-[#d0ff00] transition-colors py-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Avatar Uplink (Image)_</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="w-full text-xs font-mono text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-white/10 file:text-white hover:file:bg-[#d0ff00] hover:file:text-black cursor-pointer"
                required
              />
            </div>

            {/* Field: Email */}
            <div className="group border-b border-white/10 focus-within:border-[#d0ff00] transition-colors">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Network Email_</label>
              <input
                name="email"
                type="email"
                placeholder="USER@DOMAIN.SYS"
                className="w-full bg-transparent py-3 outline-none text-lg font-bold uppercase tracking-tight"
                required
              />
            </div>

            {/* Field: Password */}
            <div className="group border-b border-white/10 focus-within:border-[#d0ff00] transition-colors">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Access Key_</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent py-3 outline-none text-lg font-bold tracking-tight"
                required
              />
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button
                disabled={uploading}
                className="group relative flex items-center justify-between border border-[#d0ff00] p-6 hover:bg-[#d0ff00] transition-all duration-500"
              >
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#d0ff00] group-hover:text-black">
                  {uploading ? "Uploading Data..." : "Finalize Provisioning"}
                </span>
                <div className="w-2 h-2 bg-[#d0ff00] group-hover:bg-black" />
              </button>

              <button
                type="button"
                onClick={loginWithGoogle}
                className="border border-white/10 p-5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Sync with Google Identity
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="text-white hover:text-[#d0ff00] underline underline-offset-4">
              Return to Login
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;