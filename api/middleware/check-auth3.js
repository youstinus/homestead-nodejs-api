const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = req.headers.ident;
        const adminMail = req.headers.amail;
        if(userId != decoded.userId || adminMail != decoded.email){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};