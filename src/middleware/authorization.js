require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
        const token = req.header("jwt_token");

        if(!token) {
            return res.status(403).json({ msg: "authorization denied" });
        }

        try {
            //it is going to give use the user id (user:{id: user.id})
            const verify = jwt.verify(token, process.env.JWT_SECRET);
        
            req.user = verify.user;
            next();
          } catch (err) {
            res.status(401).json({ msg: "Token is not valid" });
          }


}