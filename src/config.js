module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL ||
    "postgresql://postgres:tapwater1@localhost/movienight",
    API_KEY: process.env.REACT_APP_API_KEY,
};
