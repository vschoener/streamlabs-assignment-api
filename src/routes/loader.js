module.exports = (env, config) => {
    const app = require('express')();
    const bodyParser = require('body-parser');
    const morgan = require('morgan');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan(env));
    
    app.get('/', (req, res) => {
        return res.json({message: 'Welcome to the Youtube API'});
    });

    app.use('/youtube', require('./youtube')(config.apiKey));

    // Error handler
    app.use((req, res, next) => {
        const error = {
            message: new Error('Resource not found'),
            status: 404
        };
        next(error);
    });
    
    app.use((err, req, res, next) => {
        return res
            .status(err.status || 500)
            .json({ error: { message: err.message } })
            .end();
    });

    return app;
};
