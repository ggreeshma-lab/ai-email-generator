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

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Signup
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 w-full mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Signup
      </button>
      <p className="mt-4 text-center">

  Already have an account?

  <span
    onClick={() => navigate("/login")}
    className="text-blue-600 cursor-pointer ml-2"
  >
    Login
  </span>

</p>

    </div>
  );
}

export default Signup;