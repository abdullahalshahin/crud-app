const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const ip = require('ip');

const config_app = require('./config/app');

var web_router = require('./routes/web');
var auth_router = require('./routes/auth');

var app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', web_router.routes);
app.use('/api', auth_router.routes);

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

var port = process.env.PORT || config_app.app_port;

app.listen(port, () => {
    console.log(`Example app listening on url http://` + ip.address() + `:` + port)
});
