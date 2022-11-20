const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_ENV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(
        `database connected at ${conn.connection.host} in ${conn.connection.port}`
      );
    });
};

module.exports = connectDatabase;
