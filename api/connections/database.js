import mysql from "mysql";

const pool = mysql.createPool({
  user: "root",
  password: "password",
  host: "localhost",
  database: "scratchpay",
  connectionLimit: 20,
  debug: false,
  multipleStatements: true
});

const query = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        connection.release();
        reject(error);
        return;
      }

      connection.query(query, params, (err, rows) => {
        connection.release();

        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  });
};

export default { query };
