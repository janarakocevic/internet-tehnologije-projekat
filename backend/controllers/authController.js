const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");


const registerUser = async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            firstname,
            lastname,
            email,
            password,
            phone
        } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "Nedostaju obavezni podaci"
            });
        }

        const existingUser = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Korisnik sa tim emailom vec postoji"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Pocetak transakcije
        await client.query("BEGIN");

        const result = await client.query(
            `INSERT INTO users
            (firstname, lastname, email, passwordhash, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING userid, firstname, lastname, email, phone, createdat`,
            [firstname, lastname, email, passwordHash, phone]
        );

        const userId = result.rows[0].userid;

        const roleResult = await client.query(
            "SELECT roleid FROM roles WHERE rolename = $1",
            ["Korisnik"]
        );

        if (roleResult.rows.length === 0) {
            throw new Error("Uloga Korisnik ne postoji u bazi");
        }

        const roleId = roleResult.rows[0].roleid;

        await client.query(
            `INSERT INTO userroles (userid, roleid)
             VALUES ($1, $2)`,
            [userId, roleId]
        );

        // Sve je uspjelo
        await client.query("COMMIT");

        res.status(201).json({
            message: "Registracija je uspjesna",
            user: result.rows[0],
            role: "Korisnik"
        });

    } catch (err) {

        // Ako je nesto puklo, ponisti transakciju
        await client.query("ROLLBACK");

        console.log(err);

        res.status(500).json({
            message: "Greska na serveru"
        });

    } finally {

        // Vrati konekciju nazad u Pool
        client.release();
    }
};


const loginUser = async (req, res) => {

    try{
        const {
                email,
                password
        } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Email i password su obavezni"
            });
        }
        
        const result = await pool.query(
            "SELECT * from users WHERE email = $1", [email]
        );
        if(result.rows.length === 0){
            return res.status(401).json({
                message:"Pogresan email ili password"
            });
        }

        const user = result.rows[0];

        const passwordIsValid = await bcrypt.compare(
            password,
            user.passwordhash
        );
        if(!passwordIsValid) {
            return res.status(401).json({
                message: "Pogresan email ili password"
            });
        }
        
        const roleResult = await pool.query(
            `SELECT r.rolename
            FROM roles r 
            JOIN userroles ur on r.roleid = ur.roleid
            WHERE ur.userid = $1` , [user.userid]
        );
        // jer moja baza dozvoljava da 1 korisnik ima vise uloga
        const roles = roleResult.rows.map(row => row.rolename);
        
      

        const token = jwt.sign(
            {
                userid: user.userid,
                email: user.email,
                roles: roles
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.status(200).json({
            message: "Login je uspjesan",
            token: token,
            user: {
                userid: user.userid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: roles
            }
        });

    }catch(err){
        console.log(err);

        res.status(500).json({
            message: "Greska na serveru"
        });

    }

};


module.exports = {
    registerUser, loginUser
};