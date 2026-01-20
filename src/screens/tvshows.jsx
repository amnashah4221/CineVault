import Search from './components/search';
import Navbar from './components/navbar';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import "./moviescreen.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tvscreen = ({isDarkMode, toggleTheme})=> {
    const API_KEY = '8db635acd24ba11fce26c8ddd545663d';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
   
    const [shows, setShows] = useState([]);
     const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [page, setPage] = useState(1);
      const [searchQuery, setSearchQuery] = useState("");
     const totalPages = 20; 
     const navigate = useNavigate();

    useEffect(()=>{
        const fetchMovies = async () =>{
            
            try{
                const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
                const response = await fetch(url);
                const data = await response.json();
                const showsWithDetails = await Promise.all(
                    data.results.map(async (show)=>{
                        const detailsRes = await fetch(
                            `${BASE_URL}/tv/${show.id}?api_key=${API_KEY}`
                        );
                        const details  = await detailsRes.json();
                        return{
                            ...show, 
                            runtime: details.episode_run_time,
                            genres: details.genres
                        };
                    })
                );
                setShows(showsWithDetails);
                setAllMovies(showsWithDetails);
            }
            catch(err){
                console.error(err);
            }
            
        }; 
        fetchMovies();
    }, [page]);

      useEffect(() => {
        const filtered = allMovies.filter(show =>
            show.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMovies(filtered);
    }, [searchQuery, allMovies]);

    const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
});

const toggleFavorite = (item) => {
    let updated;
    const dateAdded = new Date().toLocaleDateString();
    if (favorites.find(fav => fav.id === item.id)) {
        updated = favorites.filter(fav => fav.id !== item.id);
    } else {
        updated = [...favorites, {...item, dateAdded}];
    }
    setFavorites(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
};


    return(
        <>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
        <div className='moviesbody'>
        <h1 className='moviesh1'>TV Shows</h1>
        <h3 className='moviesh3'>Discover amazing TV series and binge-worthy shows</h3>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        
            <div className='movie-grid'>
    {movies.map(show => (
        <div className='movie-card' key={show.id}>
            <div className='movie-actions'>
               <button className='addtofav' onClick={() => toggleFavorite(show)}>
    <FaHeart color={favorites.find(fav => fav.id === show.id) ? "var(--btn2-text)" : "var(--text2-color)"} />
</button>
                <button className='viewbtn' onClick={()=>navigate(`/tvshows/${show.id}`)}>View Details</button>
            </div>
            <img src={`${IMAGE_BASE_URL}${show.poster_path}`} alt={show.name} className='img'/>
            <div className='info-1'>
                <h4 className='title'>{show.name}</h4>
                <h5 className='average'><FaStar/>{show.vote_average.toFixed(1)}</h5>
            </div>
            <div className='info-2'>
                <h5 className='date'><SlCalender/>{show.first_air_date?.substring(0,4)}</h5>
                
            </div>
            <div className='info-3'>
                <h5 className='genres'>{show.genres.map(g => <span key={g.id} className='genre'>{g.name}</span>)}</h5>
            </div>
        </div>
    ))}
</div>


            <div className="pagination">
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
        </>
    )
}
export default Tvscreen; 