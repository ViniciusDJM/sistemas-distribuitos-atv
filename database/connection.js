require("dotenv").config();
const knex = require("knex");

/**
 * Implementação do padrão Singleton para conexão com o banco de dados
 */
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = knex({
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "api_db",
        port: process.env.DB_PORT || 3306,
      },
      pool: {
        min: 2,
        max: 10,
      },
    });

    Database.instance = this;
    return this;
  }

  getConnection() {
    return this.connection;
  }
}

// Exporta uma instância única de conexão com o banco de dados
module.exports = new Database().getConnection();
