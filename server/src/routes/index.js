const usersRouter = require('./users.js');
const siteRouter = require('./site.js');
const authRouter = require('./auth.js');
const trackRouter = require('./track.js');
const catRouter = require('./category.js');
const commentRouter = require('./comment.js')


function route(app) {
    app.use('/api/v1/comments/', commentRouter)
    app.use('/api/v1/categories/', catRouter)
    app.use('/api/v1/tracks/', trackRouter);
    app.use('/api/v1/auth/', authRouter);
    app.use('/api/v1/users/', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
