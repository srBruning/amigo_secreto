require("dotenv-safe").config(); 

module.exports = {
  "username": process.env.USERNMAE_DB,
  "password": process.env.PASSWORD_DB,
  "database": process.env.NAME_DB,
  "host": "127.0.0.1",
  "dialect": "mysql",
  "define":{
    "timestamps": true,
    "underscored": true,
    "underscoredAll":true
  }
}