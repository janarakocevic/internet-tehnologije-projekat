const pool = require("../db");

const getAllProperties = async (req, res) => {
    try{
        const result = await pool.query("SELECT * from properties");

        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Greska na serveru"
        })
    }
};
const getPropertyByID = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await pool.query(
            "SELECT * from properties WHERE propertyid=$1", [id] );

        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Greska na serveru"
        })
    }
};
const updateProperty = async (req, res) => {
    try{
        const id = req.params.id;
        const description = req.body.description;

        const result = await pool.query(
            "UPDATE properties SET description = $1 WHERE propertyid = $2" , [description, id]);

        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Greska na serveru"
        })
    }
};
const deleteProperty = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await pool.query("DELETE from properties WHERE propertyid = $1", [id] );

        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Greska na serveru"
        })
    }
};

const searchProperties = async (req, res) => {
    try{
        const q = req.query.q;
        if(!q){
            return res.status(400).json({
                message: "Unesite pojam za pretragu"
            });
        }
        const result = await pool.query(
            `
            SELECT
                p.*,
                c.cityname,
                pt.typename
            FROM properties p
            JOIN cities c
                ON p.cityid = c.cityid
            JOIN propertytypes pt
                ON p.propertytypeid = pt.propertytypeid
            WHERE
                p.title ILIKE $1
                OR p.description ILIKE $1
                OR p.address ILIKE $1
                OR c.cityname ILIKE $1
                OR pt.typename ILIKE $1
            `,
            [`%${q}%`]
        );

        res.status(200).json(result.rows);
    }catch(err){
        console.log(err);

        res.status(500).json({
            message: "Greska na serveru"
        });
    }
};  

const filterProperties = async (req, res) => {
    try{
       const{
            city,
            type,
            minPrice,
            maxPrice,
            minArea,
            rooms
        } = req.query;

        let query = `
            SELECT
                p.*,
                c.cityname,
                pt.typename
            FROM properties p
            JOIN cities c
                ON p.cityid = c.cityid
            JOIN propertytypes pt
                ON p.propertytypeid = pt.propertytypeid
            WHERE 1 = 1
        `;

        const values = [];

        if (city) {
            values.push(city);

            query += `
                AND c.cityname ILIKE $${values.length}
            `;
        }

        if (type) {
            values.push(type);

            query += `
                AND pt.typename ILIKE $${values.length}
            `;
        }

        if (minPrice) {
            values.push(minPrice);

            query += `
                AND p.price >= $${values.length}
            `;
        }

        if (maxPrice) {
            values.push(maxPrice);

            query += `
                AND p.price <= $${values.length}
            `;
        }

        if (minArea) {
            values.push(minArea);

            query += `
                AND p.area >= $${values.length}
            `;
        }

        if (rooms) {
            values.push(rooms);

            query += `
                AND p.rooms >= $${values.length}
            `;
        }

        const result = await pool.query(query, values);

        res.status(200).json(result.rows);
    }catch(err){

    }
}
module.exports = { getAllProperties, getPropertyByID, updateProperty, deleteProperty, searchProperties,
    filterProperties
};