import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp"; //ipo_project/src/assets/logo.webp

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <img src={logo} alt="Logo" className="w-60 mb-4" />
      <h2 className="text-2xl font-semibold mb-2 text-center">Forgot Password?</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Enter your email address to get the password reset link.
      </p>

      <div className="w-72">
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        onClick={handleResetPassword}
        className="w-72 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Reset Password
      </button>

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

      <p
        onClick={() => navigate("/")}
        className="mt-6 text-sm text-blue-600 cursor-pointer hover:underline"
      >
        Back to Login
      </p>
    </div>
  );
}
