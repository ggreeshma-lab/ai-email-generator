import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/signup",
        {
          email,
          password
        }
      );

      alert("Signup successful");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-[#1e293b] p-8 rounded-xl shadow-2xl border border-[#334155] w-96">

        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="bg-[#0f172a] border border-[#334155] text-white p-3 w-full mb-4 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-[#0f172a] border border-[#334155] text-white p-3 w-full mb-4 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg w-full"
        >
          Signup
        </button>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer ml-2"
          >
            Login
          </span>

        </p>

      </div>
    </div>
  );
}

export default Signup;