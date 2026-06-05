import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError("");
      await axios.post(
        "http://127.0.0.1:8000/signup",
        {
          email,
          password
        }
      );

      setShowToast(true);
      setTimeout(() => navigate("/login"), 1200);

    } catch (error) {
      console.error(error);
      setError("❌ Signup failed! Email might already exist.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-8 right-8 animate-bounce z-50">
          <div className={`px-8 py-4 rounded-2xl shadow-2xl text-white font-bold text-lg backdrop-blur-xl ${
            error ? 'bg-red-500/90' : 'bg-gradient-to-r from-green-400 to-emerald-500'
          }`}>
            {error || " Account created! Redirecting to login..."}
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-purple-100 w-96 hover:shadow-3xl transition-all duration-300">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
              Join Email Pro
            </h1>
            <p className="text-purple-600 mt-2 text-sm font-semibold">Create Account & Start Generating</p>
          </div>

          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-purple-50 border-2 border-purple-300 text-gray-800 p-4 w-full mb-4 rounded-2xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition placeholder-gray-600"
          />

          <input
            type="password"
            placeholder="🔐 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-purple-50 border-2 border-purple-300 text-gray-800 p-4 w-full mb-6 rounded-2xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition placeholder-gray-600"
          />

          <button
            onClick={handleSignup}
            className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-bold px-6 py-4 rounded-2xl w-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-95"
          >
             Create Account
          </button>

          <p className="mt-8 text-center text-gray-700 font-medium">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-purple-700 font-bold cursor-pointer ml-2 hover:text-pink-600 transition"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;