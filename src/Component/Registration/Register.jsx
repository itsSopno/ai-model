import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authcontext";
import { useNavigate, Link } from "react-router";
import { updateProfile } from "firebase/auth";
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
      return alert("Password must be at least 6 characters");
    }

    try {
      // 🔵 Upload image to imgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );

      const photoURL = imgRes.data.data.display_url;

      // 🔵 Create Firebase user
      const result = await createUser(email, password);

      // 🔵 Update Firebase profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL
      });

      // 🔵 Save to backend
      await fetch("https://server-3-smoky.vercel.app/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          photo: photoURL,
          uid: result.user.uid
        })
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <fieldset className="bg-[#92afcf] rounded-lg w-full max-w-md p-6 shadow-lg text-black">

        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">

          <input
            name="name"
            placeholder="Full Name"
            className="input input-bordered bg-white"
            required
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            className="file-input file-input-bordered bg-white"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered bg-white"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered bg-white"
            required
          />

          <button
            disabled={uploading}
            className="btn btn-neutral mt-2"
          >
            {uploading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <button
          onClick={loginWithGoogle}
          className="btn btn-outline w-full mt-4"
        >
          Sign up with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold underline">
            Login
          </Link>
        </p>

      </fieldset>
    </div>
  );
};

export default Register;
