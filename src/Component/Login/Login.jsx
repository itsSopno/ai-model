import React, { useContext } from 'react';
import { AuthContext } from '../../Authcontext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../../firebase.init'; // Make sure your Firebase config is imported
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
const Login = () => {
  const { setUser, createUser } = useContext(AuthContext);
const navigate = useNavigate(null)
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Firebase Email/Password Signup
      const userCredential = await createUser(email, password);
      setUser(userCredential.user);
      console.log("Firebase User Created:", userCredential.user);

      // Send email + password to backend
      const newUser = { email, password };
      const response = await fetch('https://server-3-smoky.vercel.app/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const result = await response.json();
      console.log("Saved to backend:", result);
      navigate("/")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log("Google User:", user);

      // Optionally send Google user info to your backend
      const newUser = { email: user.email, name: user.displayName, uid: user.uid, photo:user.photoURL };
      const response = await fetch('https://server-3-smoky.vercel.app/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , authorization : `Bearer ${newUser.accessToken}`},
        body: JSON.stringify(newUser)
      });
      const backendResult = await response.json();
      console.log("Saved Google user to backend:", backendResult);
      navigate("/")
    } catch (error) {
      console.error("Google login error:", error); 
    }
  };

  return (
    <>
 <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#black] gap-9 px-4 md:px-8">
      <h2 className=" text-8xl md:text-8xl me font-sans text-[#92afcf] mb-10 uppercase tracking-wide text-center">
        AI VERSE
      </h2>

      <fieldset className="bg-[#92afcf] border-base-300 rounded-box w-full max-w-sm border p-6 shadow-md text-[#11190c]">
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
          <label className="label">Email</label>
          <input type="email" name="email" className="input input-bordered  bg-[#92afcf]" required />

          <label className="label">Password</label>
          <input type="password" name="password" className="input input-bordered bg-[#92afcf]" required />

          <button type="submit" className="btn btn-neutral mt-4 rounded-tr-4xl rounded-tl-4xl">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-outline mt-4 w-full rounded-br-4xl rounded-bl-4xl"
        >
          Continue with Google
        </button>
      </fieldset>
    </div>
    </>
  );
};

export default Login;

{/* <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#11190c] relative gap-9 px-4 md:px-8">
      <h2 className=" text-8xl md:text-8xl font text-[#7af201] mb-10 uppercase me">
        AI VERSE
      </h2>

      <fieldset className="bg-[#7AF201] max-w-sm w-full p-6 rounded shadow text-[#11190c]">
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <label>Email</label>
          <input type="email" name="email" className="input input-bordered" required />

          <label>Password</label>
          <input type="password" name="password" className="input input-bordered" required />

          <button type="submit" className="btn btn-neutral mt-4">
            Login
          </button>
        </form>
      </fieldset>
    </div> */}
