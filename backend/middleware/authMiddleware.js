const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                message: "Token nije proslijedjen"
            });
        }
        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
              message: "Token nije proslijedjen"  
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: "Token nije validan"
        });
    }
};

module.exports = authMiddleware;