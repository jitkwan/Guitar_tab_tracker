module.exports = {
  port: process.env.PORT || 8081,
  db: {
    // declace sqlite related configuration
    database: process.env.DB_NAME || "tabtracker",
    user: process.env.DB_USER || "tabtracker",
    password: process.env.DB_PASS || "tabtracker",
    options: {
      dialect: process.env.DIALECT || "sqlite", // type of database that connect to but if in a local set to sqlite
      host: process.env.HOST || "localhost", // location of db that you want to connect/ localhost is default
      storage: "./tabtracker.sqlite", // where to store sqlite file
    }
  },authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};
