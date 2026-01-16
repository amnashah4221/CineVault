import { FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuTv } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { FiFilm } from "react-icons/fi";
import './welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () =>{

    const navigate = useNavigate();
    const navigateToMovies = () => {
        navigate('/movies');
    }
     
     const navigateToShows = () => {
        navigate('/tvshows');
    }

    
    return(
        <div className="main-welcome">
            <section className="sec1-welcome">
                <FiFilm className="fifilm"/>
                <div className="sec1-heading">
                <span>Cine</span>
                <span>Vault</span>
                </div>
                <h2>Discover, explore, and curate your 
                    ultimate movie and TV show collection. 
                    Your personal cinema vault awaits.
                </h2>
                <div className="sec1-btn">
                    <button className="btn-1" onClick={navigateToMovies}><FiFilm/> Explore Movies</button>
                    <button className="btn-2" onClick={navigateToShows}><LuTv/> Browse TV Shows</button>
                </div>
            </section>


            <section className="sec2-welcome">
                <div className="cards-welcome">
                    <div className="card-welcome">
                        <IoSearch className="card-icon"/>
                        <h2>Smart Discovery</h2>
                        <p>Search and filter by genre, 
                        year, rating, and more to find 
                        your perfect watch.</p>
                    </div>

                    <div className="card-welcome">
                        <FaRegHeart className="card-icon"/>
                        <h2>Personal Watchlist</h2>
                        <p>Create and manage your 
                        favorites list with persistent
                        storage across sessions.</p>
                    </div>


                    <div className="card-welcome">
                        <FaRegStar className="card-icon"/>
                        <h2>Detailed Information</h2>
                        <p>Get comprehensive details 
                        including cast, ratings, 
                        release dates, and synopses.</p>
                    </div>
                </div>
            </section>


            <section className="sec3-welcome">
                <div className="sec3-bottom">
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join thousands of movie 
                        enthusiasts building their 
                        perfect collections.</p>
                        <button className="start-btn" onClick={navigateToMovies}>Get Started Now</button>
                </div>
            </section>
        </div>
    )
}
export default Welcome;