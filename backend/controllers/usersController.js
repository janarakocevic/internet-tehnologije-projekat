const pool = require("../db");

const getAllUsers = async (req,res) => {
    try{
        const result = await pool.query("SELECT * from users");

        res.json(result.rows);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Greska prilikom citanja baze"
        });
    }
};

const getUserByID = async (req,res) => {
    try{
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM users WHERE userid = $1",
            [id]
        );

        res.status(200).json(result.rows);

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: "Greska na serveru"
        });
    }
};

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const name = req.body.firstname;

        const result = await pool.query ("UPDATE users SET firstname = $1 WHERE userid = $2", [name, id]);

        res.status(200).json(result.rows);
    }catch(err) {
                console.log(err);

        res.status(500).json({
            message: "Greska na serveru"
        });
    }

};

const deleteUser = async(req,res) => {
    try{
        const id = req.params.id;
        
        const result = await pool.query("DELETE from users WHERE userid = $1", [id]);

        res.status(200).json(result.rows);

    }catch(err){
        console.log(err);

        res.status(500).json({
            message: "Greska na serveru"
        });

    }
};
module.exports = {
    getAllUsers, getUserByID, updateUser, deleteUser
};