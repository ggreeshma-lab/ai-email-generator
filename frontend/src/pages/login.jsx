import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const formData = new FormData();

      formData.append("username", email);

      formData.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Login failed");

    }
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Login
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
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Login
      </button>

      <p className="mt-4">

        Don't have an account?

        <span
          onClick={() => navigate("/signup")}
          className="text-blue-600 cursor-pointer ml-2"
        >
          Signup
        </span>

      </p>

    </div>

  );
}

export default Login;