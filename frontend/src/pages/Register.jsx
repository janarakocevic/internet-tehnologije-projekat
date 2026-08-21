import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Register(){

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                firstname,
                lastname,
                email,
                password,
                phone
            };

            const response = await axios.post(
                "http://localhost:3000/auth/register",
                data
            );

            setMessage(response.data.message);

            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setPhone("");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Greska prilikom registracije");
            }
        }
    };
    return(
        <div>
            <Navbar />
            <h1>Registracija</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ime: </label>
                    <input 
                        type = "text"
                        value = {firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        />
                </div>

                <div>
                    <label>Prezime: </label>
                    <input 
                        type="text"
                        value = {lastname}
                        onChange = {(e) => setLastname(e.target.value)}
                        />
                </div>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        />          
                </div>
                <div>
                    <label>Telefon</label>
                    <input 
                        type="text"
                        value = {phone}
                        onChange = {(e) => setPhone(e.target.value)}
                        />          
                </div>

                <button type="submit">
                    Registruj se
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;