import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("formal");
  const [senderRole, setSenderRole] = useState("");
  const [receiverRole, setReceiverRole] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
          sender_role: senderRole,
          receiver_role: receiverRole,
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

      showNotification(" Email generated successfully!");
      fetchHistory();
    } catch (error) {
      console.error(error);
      setEmail("Error generating email.");
      showNotification("❌ Error generating email.");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    showNotification("📋 Email copied to clipboard!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-white">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-8 right-8 animate-bounce z-50">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg">
            {toastMessage}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-12 mt-4">
          <div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
              🤖 Email Pro
            </h1>
            <p className="text-purple-700 mt-2 font-semibold">✨ Create amazing emails with AI magic ✨</p>
          </div>

          <button
            onClick={logout}
            className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white px-8 py-3 rounded-2xl transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            🚪 Logout
          </button>
        </div>

        {/* Generator Card */}
        <div className="bg-white border border-purple-200 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">

          <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">✍️ Create Your Email</h2>

          <textarea
            placeholder="📝 Tell me what your email should say..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 bg-purple-50 border-2 border-purple-300 text-gray-800 rounded-2xl p-5 mb-5 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition font-medium placeholder-gray-600 resize-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-purple-50 border-2 border-purple-300 text-gray-800 rounded-2xl p-4 font-semibold focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition"
            >
              <option value="formal">📋 Formal</option>
              <option value="professional">💼 Professional</option>
              <option value="friendly">😊 Friendly</option>
              <option value="apology">🙏 Apology</option>
            </select>

            <input
              type="text"
              placeholder="👤 From (e.g., Manager, Developer)"
              value={senderRole}
              onChange={(e) => setSenderRole(e.target.value)}
              className="bg-purple-50 border-2 border-purple-300 text-gray-800 rounded-2xl p-4 font-semibold focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition placeholder-gray-600"
            />
          </div>

          <input
            type="text"
            placeholder="👥 To (e.g., CEO, Client, Team)"
            value={receiverRole}
            onChange={(e) => setReceiverRole(e.target.value)}
            className="w-full bg-purple-50 border-2 border-purple-300 text-gray-800 rounded-2xl p-4 font-semibold mb-6 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition placeholder-gray-600"
          />

          <button
            onClick={generateEmail}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white py-4 rounded-2xl font-black text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? " Generating magic..."
              : " Generate Email"}
          </button>

        </div>

        {/* Generated Email */}
        {email && (
          <div className="mt-10 bg-white border border-purple-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                📧 Your Generated Email
              </h2>

              <button
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                📋 Copy
              </button>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 overflow-auto max-h-96">
              <pre className="whitespace-pre-wrap text-gray-800 font-sans text-sm leading-relaxed">
                {email}
              </pre>
            </div>
          </div>
        )}

        {/* History */}
        <div className="mt-12">
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            📚 Email History
          </h2>

          <div className="space-y-5">
            {history.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-purple-300 rounded-3xl p-12 text-center">
                <p className="text-purple-700 text-xl font-semibold">🎯 No emails yet. Create your first one above!</p>
              </div>
            ) : (
              history.map((item, idx) => (
                <div
                  key={item.id}
                  className="history-card bg-white border border-purple-200 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl"></div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-800 text-lg mb-3 line-clamp-2">
                        {item.prompt}
                      </h4>

                      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-300">
                          <p className="text-purple-700 text-xs font-bold">FROM</p>
                          <p className="font-bold text-gray-800">👤 {item.sender_role || "N/A"}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-300">
                          <p className="text-purple-700 text-xs font-bold">TO</p>
                          <p className="font-bold text-gray-800">👥 {item.receiver_role || "N/A"}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-300">
                          <p className="text-purple-700 text-xs font-bold">TONE</p>
                          <p className="font-bold text-gray-800">💬 {item.tone}</p>
                        </div>
                      </div>

                      <textarea
                        readOnly
                        value={item.email || item.generated_email || ""}
                        className="w-full h-32 bg-purple-50 border border-purple-300 text-gray-800 rounded-2xl p-4 text-sm focus:outline-none font-mono resize-none"
                      />
                    </div>
                  </div>
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