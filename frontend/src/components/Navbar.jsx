import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <Link to="/">Pocetna</Link>|{" "}
            <Link to="/properties">Nekretnine</Link>|{" "}
            <Link to="/login">Login</Link>|{" "}
            <Link to="/register">Registracija</Link>
        </nav>
    );
}

export default Navbar;