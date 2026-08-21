function PropertyCard({ title, price, area, rooms }){

    return(
        <div>
            <h2>{title}</h2>
            <p>Cijena: {price} €</p>
            <p>Povrsina: {area} m²</p>
            <p>Broj soba: {rooms}</p>
        </div>
    );
}

export default PropertyCard;