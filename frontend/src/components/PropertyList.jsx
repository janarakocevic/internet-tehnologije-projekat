import PropertyCard from "./PropertyCard";

function PropertyList({ properties }){
    return(
    <div>
          

            {properties.map((property) => (
                <PropertyCard 
                key = {property.propertyid}
                propertyid = {property.propertyid}
                title = {property.title}
                price = {property.price}
                area = {property.area}
                rooms = {property.rooms}
                />
            ))}
            
        </div>
        );

}

export default PropertyList;