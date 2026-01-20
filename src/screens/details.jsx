import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdAccessTime } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import "./details.css";

const MovieDetails = ({ isDarkMode, toggleTheme }) => {
  const { id } = useParams();
  const location = useLocation();
  const isTV = location.pathname.includes("tvshows");

  const API_KEY = "8db635acd24ba11fce26c8ddd545663d";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cast, setCast] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  useEffect(() => {
    const url = isTV
      ? `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
      : `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

    const fetchDetails = async () => {
      try {
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
        const videosUrl = isTV
          ? `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`
          : `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;
        const videosRes = await fetch(videosUrl);
        const videosData = await videosRes.json();
        const trailer = videosData.results.find(
          vid => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);

        const creditsRes = await fetch(
        isTV
          ? `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`
          : `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
      );
      const creditsData = await creditsRes.json();
      setCast(creditsData.cast.slice(0, 10));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, isTV]);

  if (loading) {
    return (
      <>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="moviesbody"><h2>Loading...</h2></div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="moviesbody"><h2>Not found!</h2></div>
      </>
    );
  }

const toggleFavorite = (data) => {
    let updated;
    const dateAdded = new Date().toLocaleDateString();
    if (favorites.find(fav => fav.id === data.id)) {
        updated = favorites.filter(fav => fav.id !== data.id);
    } else {
        updated = [...favorites, {...data, dateAdded}];
    }
    setFavorites(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
};

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="detailsbody">
        <button onClick={()=>navigate(isTV ? "/tvshows" : "/movies")} className="back-btn"><IoMdArrowBack/>Back</button>
        <div className="backdropimg"style={{backgroundImage:`url(${IMAGE_BASE_URL}${data.backdrop_path})` }}>
        <div className="overlay">
        <div className="details-basics">
           <img
            src={`${IMAGE_BASE_URL}${data.poster_path}`}
            alt={data.title || data.name}
            className="posterimg"
            
          />

          <div className="details-info">
            <h1>{data.title || data.name}</h1>
          <div className="stats">
            <p>
              <FaStar style={{color: " #ffd900"}}/> {data.vote_average?.toFixed(2)}
            </p>

            <p>
              <SlCalender /> {data.release_date || data.first_air_date}
            </p>

            {(data.runtime || data.episode_run_time?.[0]) && (
              <p>
                <MdAccessTime />{" "}
                {data.runtime || data.episode_run_time[0]} min
              </p>
            )}
          </div>
            <p className="genres"> 
              {data.genres?.map(g => (
                <span key={g.id} className="genre">{g.name}</span>
              ))}
            </p>
            
            <div className="buttons">
              <button className="playbtn" onClick={() => {
                    if (trailerUrl) window.open(trailerUrl, "_blank");
                    else alert("Trailer not available");
                  }}><FaPlay/>Watch Trailer</button>
              <button className="addbtn"onClick={() => toggleFavorite(data)}><FaHeart/>Add to Watchlist</button>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div className="details-body">
          <div className="left-body">
         <div className="overview">
              <h2>Overview</h2>
            <p>{data.overview}</p>
          </div>

          <div className="cast">
              <h2>Cast</h2>
              <div className="members">
                {cast.map(member=>(
                  <div className="cast-members">
                     <img
          src={`${IMAGE_BASE_URL}${member.profile_path}`}
          alt={member.name}
        />
        <p>{member.name}</p>
        <p className="character">{member.character}</p>
                  </div>
                ))}
              </div>
          </div>
          </div>
          <div className="right-body">
      <div className="movie-stats">
  <h2>Movie Details</h2>
  <div className="stat">
    <span className="label">Release Date:</span>
    <span className="value">{data.release_date || data.first_air_date}</span>
  </div>
  <div className="stat">
    <span className="label">Runtime:</span>
    <span className="value">
      {data.runtime
        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
        : data.episode_run_time?.[0]
        ? `${Math.floor(data.episode_run_time[0] / 60)}h ${data.episode_run_time[0] % 60}m`
        : "N/A"}
    </span>
  </div>
  <div className="stat">
    <span className="label">Rating:</span>
    <span className="value">{data.vote_average?.toFixed(1)}/10</span>
  </div>
  <div className="stat">
    <span className="label">Votes:</span>
    <span className="value">{data.vote_count?.toLocaleString()}</span>
  </div>
</div>

      </div>
      </div>
        
      </div>

    </>
  );
};

export default MovieDetails;
