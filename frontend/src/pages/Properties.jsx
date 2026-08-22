import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

function Properties(){

    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        try{
            if(!search.trim()) {
                const response = await api.get("/properties");
                setProperties(response.data);
                return;
            }

            const response = await api.get("/properties/search", {
                params: {
                    q : search
                }
            });

            setProperties(response.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
           api.get("/properties")
            .then((response) => {
                setProperties(response.data);
            }).catch((error) => {
                console.log(error);
            }); 
    }, []);
    return (
        <div>
            <Navbar />
            <h1>Nekretine</h1>

            <div>
                <input 
                    type = "text"
                    placeholder="Pretrazi nekretnine"
                    value = {search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            <button onClick={handleSearch}>
                Pretrazi
            </button>
            </div>
          
            <PropertyList properties={properties} />
                    
        </div>
    );
}

export default Properties;