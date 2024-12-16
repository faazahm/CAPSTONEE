import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Programming from "./pages/Programming";
import Saved from "./pages/Saved";
import CovidBar from "./components/CovidBar";
import "./App.css";
import Indonesia from "./pages/Indonesia"; // Import halaman Indonesia

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      navigate(`/search/${searchTerm}`); // Perbaikan path
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearSearchTerm = () => {
    setSearchTerm(""); // Reset searchTerm setiap kali pindah halaman
  };

  return (
    <Router>
      <div className="nav-links">
        {/* Navbar */}
        <nav>
          <NavLink to="/" onClick={clearSearchTerm}>
            DailyLens
          </NavLink>
          <NavLink to="/indonesia" onClick={clearSearchTerm}>
            Indonesia
          </NavLink>
          <NavLink to="/programming" onClick={clearSearchTerm}>
            Programming
          </NavLink>
          <NavLink to="/covid" onClick={clearSearchTerm}>
            COVID-19
          </NavLink>
          <NavLink to="/saved" onClick={clearSearchTerm}>
            Saved
          </NavLink>
          {/* Komponen Search */}
          <div className="search-bar">
            <Search onSearch={handleSearch} />
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home key="home" />} />
          <Route path="/indonesia" element={<Indonesia key="indonesia" />} />
          <Route
            path="/programming"
            element={<Programming key="programming" />}
          />
          <Route path="/covid" element={<CovidBar key="covid" />} />
          <Route path="/saved" element={<Saved key="saved" />} />

          {/* Route dinamis untuk pencarian berdasarkan kata kunci */}
          <Route
            path="/search/:searchTerm"
            element={<Home searchTerm={searchTerm} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
