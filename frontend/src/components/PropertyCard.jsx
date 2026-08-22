import { Link } from "react-router-dom";

function PropertyCard({ propertyid, title, price, area, rooms }){

    return(
        <div>
            <h2>{title}</h2>
            <p>Cijena: {price} €</p>
            <p>Povrsina: {area} m²</p>
            <p>Broj soba: {rooms}</p>

            <Link to={`/properties/${propertyid}`}>
            Pogledaj detalje
            </Link>
        </div>
    );
}

export default PropertyCard;