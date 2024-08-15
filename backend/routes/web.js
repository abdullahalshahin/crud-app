const express = require('express');
const authenticated_middleware = require('../app/Http/Middleware/Authenticate');
const public_page_controller = require('../app/Http/Controllers/PublicPageController');
const post_controller = require('../app/Http/Controllers/PostController');

const Route = express.Router();

// ------------------ PUBLIC page route section ------------------
Route.get('/index', public_page_controller.index);

// ------------------ authenticated user route section ------------------
Route.get('/user-panel/dashboard/posts', authenticated_middleware, post_controller.index);
Route.get('/user-panel/dashboard/posts/:post_id/show', authenticated_middleware, post_controller.show);
Route.post('/user-panel/dashboard/posts/store', authenticated_middleware, post_controller.store);
Route.get('/user-panel/dashboard/posts/:post_id/edit', authenticated_middleware, post_controller.edit);
Route.put('/user-panel/dashboard/posts/:post_id/update', authenticated_middleware, post_controller.update);
Route.delete('/user-panel/dashboard/posts/:post_id/delete', authenticated_middleware, post_controller.destroy);

module.exports = {
	routes: Route
}
