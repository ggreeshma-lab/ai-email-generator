import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("formal");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchHistory();
  }, []);

  const generateEmail = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/generate",
        {
          prompt,
          tone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmail(
        response?.data?.generated_email ||
          "No response generated."
      );

      fetchHistory();
    } catch (error) {
      console.error(error);
      setEmail("Error generating email.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            AI Email Generator
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

        {/* Generator Card */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8 shadow-xl">

          <textarea
            placeholder="Enter your email topic..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 bg-[#0f172a] border border-[#334155] text-white rounded-xl p-4 mb-4 focus:outline-none focus:border-cyan-400"
          />

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white rounded-xl p-3 mb-4"
          >
            <option value="formal">Formal</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="apology">Apology</option>
          </select>

          <button
            onClick={generateEmail}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {loading
              ? "Generating..."
              : "Generate Email"}
          </button>

        </div>

        {/* Generated Email */}
        {email && (
          <div className="mt-8 bg-[#1e293b] border border-[#334155] rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-2xl font-semibold text-white">
                Generated Email
              </h2>

              <button
                onClick={copyToClipboard}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
              >
                Copy
              </button>

            </div>

            <pre className="whitespace-pre-wrap text-gray-300 font-sans">
              {email}
            </pre>

          </div>
        )}

        {/* History */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold text-white mb-6">
            Email History
          </h2>

          <div className="space-y-4">

            {history.length === 0 ? (
              <div className="text-gray-400">
                No history available.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1e293b] border border-[#334155] rounded-xl p-5"
                >
                  <p className="text-white font-semibold">
                    {item.prompt}
                  </p>

                  <p className="text-cyan-400 text-sm mt-1">
                    Tone: {item.tone}
                  </p>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;