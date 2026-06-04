import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between">
      <h1>AI Email Generator</h1>

      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">History</Link>
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;