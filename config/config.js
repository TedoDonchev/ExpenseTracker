const config = {
    PORT: 5000,
    DB_URI: 'mongodb://localhost/expenseTracker',
    SALT_ROUNDS: 10,
    SECRET: 'MNOGOQKASOL',
    COOKIE_NAME: "TOKEN",
}

module.exports = config;