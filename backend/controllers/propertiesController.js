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


module.exports = { getAllProperties, getPropertyByID, updateProperty, deleteProperty };