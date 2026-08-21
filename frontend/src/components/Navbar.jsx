import { Link, useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        navigate("/login");
    };

    const token = localStorage.getItem("token");

    return(
        <nav>
            <Link to="/">Pocetna</Link>|{" "}
            <Link to="/properties">Nekretnine</Link>|{" "}

            {!token && (
                <>
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Registracija</Link>
                </>
            )}
            
            {token && (
                <button onClick={handleLogout}>
                    Logout
                </button>
            )}

        </nav>
    );
}

export default Navbar;