const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require('path');
// Carrega  as variáveis de ambiente definidas no arquivo .env
//dotenv.config();
// garante que carregue o .env da pasta server
dotenv.config({ path: path.join(__dirname, '..', '.env') });






const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT
});

module.exports = pool;
