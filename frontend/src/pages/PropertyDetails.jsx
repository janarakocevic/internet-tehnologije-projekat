import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function PropertyDetails() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);

    useEffect(() => {
        const getProperty = async () => {
            try {

                 console.log("ID:", id);

                const response = await api.get(
                    `/properties/${id}`
                );

                console.log("PROPERTY RESPONSE:", response.data);

                setProperty(response.data[0]);

            } catch (error) {
                console.log(error);
            }
        };
        getProperty();
    }, [id]);

    if(!property) {
        return (
            <div>
                <Navbar />
                <p>Ucitavanje...</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <h1>{property.title}</h1>

            <p>
                Cijena: {property.price} €
            </p>

            <p>
                Površina: {property.area} m²
            </p>

            <p>
                Broj soba: {property.rooms}
            </p>

            <p>
                Adresa: {property.address}
            </p>

            <p>
                {property.description}
            </p>
        </div>
    );
}

export default PropertyDetails;