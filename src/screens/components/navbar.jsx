import { CiHome } from "react-icons/ci";
import { LuTv } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FiFilm } from "react-icons/fi";
import { useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked (for mobile)
  const handleLinkClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "links-btn active" : "links-btn";

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <h1 className="navlogo">
          <FiFilm className="fifilm" /> CineVault
        </h1>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Nav Links */}
      <div className={`links ${isMenuOpen ? "open" : ""}`}>
        <NavLink to="/home" className={getNavLinkClass} onClick={handleLinkClick}>
          <CiHome /> Home
        </NavLink>
        <NavLink to="/movies" className={getNavLinkClass} onClick={handleLinkClick}>
          <FiFilm /> Movies
        </NavLink>
        <NavLink to="/tvshows" className={getNavLinkClass} onClick={handleLinkClick}>
          <LuTv /> TV Shows
        </NavLink>
        <NavLink to="/watchlist" className={getNavLinkClass} onClick={handleLinkClick}>
          <FaHeart/>Watchlist
        </NavLink>
      </div>

      {/* Theme Toggle */}
      <div className="options">
        <button className="toggletheme-btn" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
