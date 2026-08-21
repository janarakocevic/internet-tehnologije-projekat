import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

function Properties(){

    const [properties, setProperties] = useState([]);

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
          
            <PropertyList properties={properties} />
                    
        </div>
    );
}

export default Properties;