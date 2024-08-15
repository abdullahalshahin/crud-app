const express = require('express');
const auth_controller = require('../app/Http/Controllers/AuthController');

const Route = express.Router();

Route.post('/login', auth_controller.login);

module.exports = {
    routes: Route
}
