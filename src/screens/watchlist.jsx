import Navbar from './components/navbar';
import { useState, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdAccessTime } from "react-icons/md";
import './moviescreen.css'
const Watchlist = ({isDarkMode, toggleTheme}) =>{

const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("watchlist");
        setWatchlist(saved ? JSON.parse(saved) : []);
    }, []);
    
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
        <h1 className='moviesh1'><FaHeart style={{color: "var(--btn2-text)",marginRight:"7px"}}/>My WatchList</h1>
        <p className='favlen'>You have {favorites.length} items in your watchlist</p>
 <div className='movie-grid'>
    {watchlist.map(item => {const durationText = Array.isArray(item.runtime)
                            ? (item.runtime.length > 0 && item.runtime[0] > 0 ? `${item.runtime[0]} min` : 'N/A')
                            : (item.runtime > 0 ? `${item.runtime} min` : 'N/A');
                        
                        return (

        <div className='movie-card' key={item.id}>
            <h5 className='dateadd'>Added on: {item.dateAdded}</h5>
            <div className='movie-actions'>
                <button className='addtofav' onClick={() => toggleFavorite(item)}>
                    <FaHeart 
                        color={favorites.find(fav => fav.id === item.id) ? "var(--btn2-text)" : "var(--text2-color)"} 
                    />
                </button>
                <button className='viewbtn'>View Details</button>
            </div>
            <img 
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                alt={item.name || item.title} 
                className='img'
            />
            <div className='info-1'>
                <h4 className='title'>{item.name || item.title}</h4>
                <h5 className='average'><FaStar/> {item.vote_average.toFixed(1)}</h5>
            </div>
            <div className='info-2'>
                <h5 className='date'><SlCalender /> {item.first_air_date?.substring(0,4) || item.release_date?.substring(0,4)}</h5>
              {durationText !== 'N/A' && (
    <h5 className='duration'>
        <MdAccessTime /> 
        {durationText}
    </h5>
)}
      </div>
            <div className='info-3'>
                <h5 className='genres'>
                    {item.genres?.map(g => <span key={g.id} className='genre'>{g.name}</span>)}
                </h5>
            </div>
        </div>
        
    )})}
</div>
 </div>


    </>
    )
}
export default Watchlist;