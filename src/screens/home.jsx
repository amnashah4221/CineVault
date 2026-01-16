import Navbar from "./components/navbar";
import Welcome from "./welcomescreen";

const Home = ({isDarkMode, toggleTheme}) => {

        return(
        <>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
        <Welcome isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
         </>
    )
}
export default Home;