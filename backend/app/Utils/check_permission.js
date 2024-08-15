const database = require('./../../config/database');

const CheckPermission = async (auth_user, permission_name) => {
    const [permissions_rows] = await database.promise().query(`
        SELECT p.name 
        FROM permissions p
        INNER JOIN role_has_permissions rp ON p.id = rp.permission_id
        INNER JOIN roles r ON rp.role_id = r.id
        WHERE r.id = ?
    `, [auth_user.role_id]);

    const user_permissions = permissions_rows.map(row => row.name);

    if (user_permissions.includes(permission_name)) {
        return true;
    }
    else {
        return {
            success: false,
            message: "Permission denied."
        };
    }
};

module.exports = CheckPermission;
