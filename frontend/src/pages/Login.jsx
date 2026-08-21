import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = {
                email, password
            };

            const response = await axios.post(
                "http://localhost:3000/auth/login",
                data
            );
            setMessage(response.data.message);
        }catch(error){
            console.log(error);

            if(error.response) {
                setMessage(error.response.data.message);
            } else{
                setMessage("Greska prilikom logovanja");
            }
        }
    };
    return(
        <div>
            <Navbar />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                </div>
                <button type="submit">
                    Uloguj se
                </button>

            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;