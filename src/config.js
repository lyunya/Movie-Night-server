module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL ||
    "postgresql://postgres:tapwater1@localhost/movienight",
  API_KEY: process.env.REACT_APP_API_KEY,
  TEST_DB_URL:
    process.env.TEST_DB_URL ||
    "postgresql://postgres:tapwater1@localhost/movienight-test",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
};
