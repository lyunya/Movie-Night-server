module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:tapwater1@localhost/movienight",
  API_KEY: process.env.REACT_APP_API_KEY,
  TEST_DATABSE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://postgres:tapwater1@localhost/movienight-test",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "20s",
};
