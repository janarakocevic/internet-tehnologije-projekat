import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

function Properties(){

    const [properties, setProperties] = useState([]);

    useEffect(() => {
            axios.get("http://localhost:3000/properties")
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
          
            <PropertyList properties={properties} />
                    
        </div>
    );
}

export default Properties;