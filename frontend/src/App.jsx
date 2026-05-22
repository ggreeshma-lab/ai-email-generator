import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("formal");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch email history
  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/history"
      );

      setHistory(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  // Load history on page load
  useEffect(() => {

    fetchHistory();

  }, []);

  // Generate email
  const generateEmail = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/generate",
        {
          prompt,
          tone
        }
      );

      setEmail(
        response?.data?.generated_email || "No response received."
      );

      // Refresh history
      fetchHistory();

    } catch (error) {

      console.error(error);

      setEmail("Error generating email.");

    } finally {

      setLoading(false);

    }
  };

  // Copy email
  const copyToClipboard = () => {

    navigator.clipboard.writeText(email);

    alert("Email copied!");

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          AI Email Generator
        </h1>

        {/* Textarea */}
        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 h-40 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter email topic..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Tone Select */}
        <select
          className="w-full mt-4 border border-gray-300 rounded-xl p-3"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="apology">Apology</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={generateEmail}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl text-lg hover:bg-gray-800 transition"
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>

        {/* Generated Email */}
        {email && (

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-2xl font-semibold text-gray-700">
                Generated Email
              </h2>

              <button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Copy
              </button>

            </div>

            <pre className="whitespace-pre-wrap text-gray-800">
              {email}
            </pre>

          </div>

        )}

        {/* Email History */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Email History
          </h2>

          <div className="space-y-4">

            {history.map((item) => (

              <div
                key={item.id}
                className="bg-gray-100 p-4 rounded-xl"
              >

                <p className="font-semibold">
                  {item.prompt}
                </p>

                <p className="text-sm text-gray-500">
                  Tone: {item.tone}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default App;