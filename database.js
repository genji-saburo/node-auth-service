var env = require('dotenv').config();
var Sequelize = require('sequelize');
var DataTypes = Sequelize;

var db = new Sequelize(env.parsed.DATABASE, env.parsed.USERNAME, env.parsed.PASSWORD, {
	host: env.parsed.HOST || 'localhost',
    dialect: 'mysql',
    logging: false
});

db.User = db.import(__dirname + '/models/user');
db.AccessToken = db.import(__dirname + '/models/access_token');
db.RefreshToken = db.import(__dirname + '/models/refresh_token');
db.Client = db.import(__dirname + '/models/client');
db.Permission = db.import(__dirname + '/models/permission');
db.Role = db.import(__dirname + '/models/role');

// drop the entire db when on a local machine and run the test files in the test/ dir
if (!process.env.NODE_ENV) {
    //db.drop();
}

db.sync()
.then(function() {
    console.log('server started...');
}).catch(function(err) {
    console.log('database connection failed...', err);
});

module.exports = db;
