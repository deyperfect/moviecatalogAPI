const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyToken = (req, res, next) => {

	const authHeader = req.headers.authorization;

	if(!authHeader) {
		return res.status(401).send({ auth: "Failed", message: "No token provided"});
	} 
    
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ auth: "Failed", message: err.message });
        }
        req.user = decoded;
        next();
    });
}