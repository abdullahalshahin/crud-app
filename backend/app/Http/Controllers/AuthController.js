const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config_app = require('./../../../config/app');
const database = require('./../../../config/database');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const [rows] = await database.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const password_match = await bcrypt.compare(password, user.password);

        if (!password_match) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user.id }, config_app.app_key);

        const [permissions_rows] = await database.promise().query(`
            SELECT p.name
            FROM permissions p
            INNER JOIN role_has_permissions rp ON p.id = rp.permission_id
            INNER JOIN roles r ON rp.role_id = r.id
            WHERE r.id = ?
        `, [user.role_id]);

        const permission_names = permissions_rows.map(row => row.name);

        res.status(200).json({
            status: "success",
            message: "Login Successfully!!!",
            token: token,
            result: {
                user: user,
                permissions: permission_names
            }
        })
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    login
}
