const usersRouter = require('./users.js');
const siteRouter = require('./site.js');
const authRouter = require('./auth.js');
const trackRouter = require('./track.js')

function route(app) {
    app.use('/api/track/', trackRouter);
    app.use('/api/auth/', authRouter);
    app.use('/api/users/', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
