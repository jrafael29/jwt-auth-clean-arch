import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'adlearn',
});

