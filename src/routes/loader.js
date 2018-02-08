module.exports = (env) => {
    const app = require('express')();
    const bodyParser = require('body-parser');
    const morgan = require('morgan');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan(env));
    
    app.get('/', (req, res) => {
        return res.json({message: 'Welcome to the Youtube API'});
    });

    // Error handler
    app.use((req, res, next) => {
        const error = new Error('Resource not found');
        // Maybe a better way to handle this ?
        error.status = 404;
        next(error);
    });
    
    app.use((err, req, res, next) => {
        // log err.stack
        res.status(err.status || 500);
        return res
            .json({ error: { message: err.message } })
            .end();
    });

    return app;
};
