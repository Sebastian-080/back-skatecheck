const config = {
    port: process.env.PORT || 3000,
    corsOptions: {
        origin: '*',
        optionsSuccessStatus: 200
    }
};

module.exports = config;
