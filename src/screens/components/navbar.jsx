import { CiHome } from "react-icons/ci";
import { LuTv } from "react-icons/lu";
import { FiFilm } from "react-icons/fi";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import "./navbar.css";

const Navbar = ({isDarkMode, toggleTheme}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getNavLinkClass  = ({isActive}) => (
    isActive ? "links-btn active" : "links-btn"
  )
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <h1 className="navlogo"><FiFilm className="fifilm" />  CineVault</h1>
      </div>

<div className="hamburger-icon" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

      <div className="links">
  <NavLink to="/home" className="links-btn"><CiHome /> Home</NavLink>
  <NavLink to="/movies" className="links-btn"><FiFilm /> Movies</NavLink>
  <NavLink to="/tvshows" className="links-btn"><LuTv /> TV Shows</NavLink>
  <NavLink to="/watchlist" className="links-btn">Watchlist</NavLink>
</div>

      <div className="options">
        <button className="toggletheme-btn" onClick={toggleTheme}>  
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        </div>
    </nav>
  );
};

export default Navbar;
