const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if(!req.user || !req.user.roles){
            return res.status(403).json({
                message: "Nemate dozvolu za ovu akciju"
            });
        }
        const hasRole = req.user.roles.some(role => 
            allowedRoles.includes(role)
        );
        if(!hasRole){
            return res.status(403).json({
                message: "Nemate dozvolu za ovu akciju"
            });
        }

        next();

    };
};


module.exports = authorizeRoles;