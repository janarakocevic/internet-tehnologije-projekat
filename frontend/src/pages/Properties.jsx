import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

function Properties(){

    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");

    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minArea, setMinArea] = useState("");
    const [rooms, setRooms] = useState("");

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

    const handleFilter = async () => {
        try {
            const params = {};

            if(city) params.city = city;
            if(type) params.type = type;
            if(minPrice) params.minPrice = minPrice;
            if(maxPrice) params.maxPrice = maxPrice;
            if(minArea) params.minArea = minArea;
            if(rooms) params.rooms = rooms;

            const response = await api.get(
                "/properties/filter",
                {
                    params: params
                }
            );

            setProperties(response.data);
        } catch(error) {
            console.log(error);
        }
    };
    const resetFilters = async () => {
        setCity("");
        setType("");
        setMinPrice("");
        setMaxPrice("");
        setMinArea("");
        setRooms("");

    try {
        const response = await api.get("/properties");
        setProperties(response.data);
    } catch (error) {
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

            <h2>Detaljna pretraga</h2>
            <div>
                <input 
                    type="text"
                    placeholder="Grad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="Tip nekretnine"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Minimalna cijena"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                 <input 
                    type="number"
                    placeholder="Maksimalna cijena"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />  
                 <input 
                    type="number"
                    placeholder="Minimalna povrsina"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                />        
                 <input 
                    type="number"
                    placeholder="Minimalni broj soba"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                />     
                <button onClick={handleFilter}>
                    Filtriraj
                </button> 
                <button onClick={resetFilters}>
                    Resetuj filtere
                </button>                                 
            </div>


            <PropertyList properties={properties} />
                    
        </div>
    );
}

export default Properties;