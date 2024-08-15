const jwt = require("jsonwebtoken");
const config_app = require('./../../../config/app');
const database = require('./../../../config/database');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - Missing or invalid token.' });
        }

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, config_app.app_key);
        const { userId } = decoded;

        const [rows] = await database.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
        req.auth_user = rows[0];

        next();
    } 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized - Token has expired.' });
        }

        return res.status(401).json({ error: 'Unauthorized - Invalid token.' });
    }
}

module.exports = auth;