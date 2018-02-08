const env = process.env.NODE_ENV || 'prod';
const config = require('./config/loader')(env);
const port = process.env.NODE_API_PORT || 80;
const app = require('./routes/loader')(env);

app.listen(port, () => {
    console.log(`I'm running on port ${port}`);
});

// Only for testing 
module.exports = app;
