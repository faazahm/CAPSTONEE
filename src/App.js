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
import Indonesia from "./pages/Indonesia";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      navigate(`/search/${searchTerm}`);
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

const googleFontLink = document.createElement("link");
googleFontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap";
googleFontLink.rel = "stylesheet";

document.head.appendChild(googleFontLink);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <Router>
      <div className="nav-links">
        <nav>
          <NavLink to="/" onClick={clearSearchTerm} className="bold-link">
            DailyLens
          </NavLink>
          <NavLink to="/indonesia" onClick={clearSearchTerm}>
            Indonesia
          </NavLink>
          <NavLink to="/programming" onClick={clearSearchTerm}>
            Programming
          </NavLink>
          <NavLink to="/covid" onClick={clearSearchTerm}>
            COVID
          </NavLink>
          <NavLink to="/saved" onClick={clearSearchTerm}>
            Saved
          </NavLink>

          <NavLink onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </NavLink>

          <div className="search-bar">
            <Search onSearch={handleSearch} />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home key="home" />} />
          <Route path="/indonesia" element={<Indonesia key="indonesia" />} />
          <Route
            path="/programming"
            element={<Programming key="programming" />}
          />
          <Route path="/covid" element={<CovidBar key="covid" />} />
          <Route path="/saved" element={<Saved key="saved" />} />
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
