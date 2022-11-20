const app = require('./app');
const dotenv = require('dotenv');
//set up enviroment file
dotenv.config({ path: 'backend/config/config.env' });
app.listen(process.env.PORT, () => {
  console.log(
    `Server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
