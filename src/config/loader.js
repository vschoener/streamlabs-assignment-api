module.exports = (env) => {
    const config = require(`./${env}.js`);
    if (config == undefined) {
        console.error(`${env} config file not available`);
        process.exit(1);
    }
    return config;
};
