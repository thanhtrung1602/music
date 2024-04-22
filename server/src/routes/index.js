const usersRouter = require('./users.js');
const siteRouter = require('./site.js');
const authRouter = require('./auth.js');

function route(app) {
    app.use('/api/auth/', authRouter);
    app.use('/api/users/', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
