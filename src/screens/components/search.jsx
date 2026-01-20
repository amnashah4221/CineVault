import "./search.css";
import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";

const Search = ({searchQuery, setSearchQuery}) => {

    return(
        <>
        <div className='searchportion'>
            <div className='searchbar'>
`               <IoSearch className="search-icon"/> <input type="text" placeholder="Search movies ..." className="searchtext" value={searchQuery}  onChange={(e)=>setSearchQuery(e.target.value)}/>
            </div>

            <div className='filter'>
              <button className="filter-btn"> <CiFilter className="filtericon"/> Filters </button> 
            </div>
        </div>
        </>
    )
}

export default Search;