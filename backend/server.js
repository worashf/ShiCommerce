const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');
//set up enviroment file
dotenv.config({ path: 'backend/config/config.env' });

// uncatght exception handler
process.on('uncaughtException', (err) => {
  console.log('Error', err.message);
  console.log('shutting down because of uncatght excepion');
  process.exit(1);
});

connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// Handle unhandled promise rejection

process.on('unhandledRejection', (err) => {
  console.log('Error', err.message);
  console.log('Shutting down the server due to unhaleded promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
