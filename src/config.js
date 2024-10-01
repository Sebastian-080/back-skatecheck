const config = {
    port: process.env.PORT || 5000,
    corsOptions: {
        origin: '*',
        optionsSuccessStatus: 200
    }
};

module.exports = config;
