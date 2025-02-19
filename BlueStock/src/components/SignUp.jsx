import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/logo.webp"; //ipo_project/src/assets/logo.webp

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!isVerified) {
      alert("Please verify that you're not a robot.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-Up Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <img src={logo} alt="Logo" className="w-60 mb-6" />
      <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>
      
      <div className="w-72">
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-2 border rounded mb-4 pr-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>
      </div>

      {/* Google reCAPTCHA */}
      <ReCAPTCHA
        sitekey="6LebN9wqAAAAAFAOLmCOLAtFaRWtesBRDNxUYuy2"
        onChange={() => setIsVerified(true)}
      />

      <button
        onClick={handleSignUp}
        className={`w-72 text-white p-2 rounded transition ${
          isVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isVerified}
      >
        Sign Up
      </button>
      
      <p className="mt-4 text-sm font-medium text-gray-700">Or sign up with</p>
      
      <button
        onClick={handleGoogleSignUp}
        className="w-72 flex items-center justify-center gap-2 bg-white border border-gray-300 p-2 rounded mt-3 shadow-md hover:bg-gray-100 transition"
      >
        <FcGoogle size={20} /> Sign Up with Google
      </button>
      
      <p
        onClick={() => navigate("/")}
        className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline"
      >
        Already have an account? Login
      </p>
    </div>
  );
}
