const dotenv = require('dotenv');
dotenv.config(); 

module.exports = {
  port: process.env.PORT || 5000,
  MONGOURI: process.env.MONGOURI,
  JWT_SECRET: process.env.JWT_SECRET
};
