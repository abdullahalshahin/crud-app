const joi = require('joi');
const database = require('./../../../config/database');
const CheckPermission = require('./../../Utils/check_permission');
const post_resource = require('./../Resources/PostResource');

const index = async (req, res) => {
    try {
        const permission_check = await CheckPermission(req.auth_user, "post_view");

        if (permission_check !== true) {
            return res.status(403).json(permission_check);
        }

        let raw_posts = await database.promise().query('SELECT * FROM posts ORDER BY created_at DESC');

        const posts = raw_posts[0].map((post) => {
            return post_resource.post_data(post, req);
        });

        res.status(200).json({
            success: true,
            message: "Data Show Successfully!!!",
            result: {
                posts: posts
            }
        });
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

const show = async (req, res) => {
    try {
        const permission_check = await CheckPermission(req.auth_user, "post_view");

        if (permission_check !== true) {
            return res.status(403).json(permission_check);
        }

        const { post_id } = req.params;

        let [raw_post] = await database.promise().query('SELECT * FROM posts WHERE id = ?', [post_id]);
        raw_post = raw_post[0];

        if (raw_post) {
            res.status(200).json({
                success: true,
                message: "Data Show Successfully!!!",
                result: {
                    post: post_resource.post_data(raw_post, req)
                }
            });
        } 
        else {
            res.status(200).json({
                success: false,
                message: "Data Not Found!!!",
                result: {
                    post: null
                }
            });
        }
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

const store = async (req, res) => {
    try {
        const permission_check = await CheckPermission(req.auth_user, "post_create");

        if (permission_check !== true) {
            return res.status(403).json(permission_check);
        }

        const schema = joi.object({
            title: joi.string().min(5).max(150).required(),
            text: joi.string().min(5).required()
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }

        const { title, text } = value;

        const insert_post = await database.promise().query(
            'INSERT INTO posts (user_id, title, text) VALUES (?, ?, ?)',
            [req.auth_user.id, title, text]
        );

        res.status(201).json({
            success: true,
            message: 'Post Created successfully!',
        });
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

const edit = async (req, res) => {
    try {
        try {
            const permission_check = await CheckPermission(req.auth_user, "post_edit");
    
            if (permission_check !== true) {
                return res.status(403).json(permission_check);
            }
    
            const { post_id } = req.params;
    
            let [raw_post] = await database.promise().query('SELECT * FROM posts WHERE id = ?', [post_id]);
            raw_post = raw_post[0];
    
            if (raw_post) {
                res.status(200).json({
                    success: true,
                    message: "Data Show Successfully!!!",
                    result: {
                        post: post_resource.post_data(raw_post, req)
                    }
                });
            } 
            else {
                res.status(200).json({
                    success: false,
                    message: "Data Not Found!!!",
                    result: {
                        post: null
                    }
                });
            }
        } 
        catch (error) {
            res.status(400).json(error.message);
        }
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

const update = async (req, res) => {
    try {
        const permission_check = await CheckPermission(req.auth_user, "post_edit");

        if (permission_check !== true) {
            return res.status(403).json(permission_check);
        }

        const { post_id } = req.params;

        let [raw_post] = await database.promise().query('SELECT * FROM posts WHERE id = ?', [post_id]);
        raw_post = raw_post[0];

        if (raw_post) {
            const schema = joi.object({
                title: joi.string().min(5).max(150).required(),
                text: joi.string().min(5).required()
            });

            const { error, value } = schema.validate(req.body, { abortEarly: false });

            if (error) {
                return res.status(400).json({ errors: error.details.map(err => err.message) });
            }

            const { title, text } = value;

            await database.promise().query(
                'UPDATE posts SET title = ?, text = ? WHERE id = ?',
                [title, text, raw_post.id]
            );

            res.status(200).json({
                success: true,
                message: "Data Updated Successfully!!!",
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Data Not Found!!!",
                result: {
                    post: null
                }
            });
        }
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

const destroy = async (req, res) => {
    try {
        const permission_check = await CheckPermission(req.auth_user, "post_delete");

        if (permission_check !== true) {
            return res.status(403).json(permission_check);
        }

        const { post_id } = req.params;

        let [raw_post] = await database.promise().query('SELECT * FROM posts WHERE id = ?', [post_id]);
        raw_post = raw_post[0];

        if (raw_post) {
            await database.promise().query(
                'DELETE FROM posts WHERE id = ?',
                [raw_post.id]
            );

            res.status(200).json({
                success: true,
                message: "Data Delete Successfully!!!",
            });
        } 
        else {
            res.status(200).json({
                success: false,
                message: "Data Not Found!!!",
            });
        }
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    index,
    show,
    store,
    edit,
    update,
    destroy
}
