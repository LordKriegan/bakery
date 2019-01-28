//setup dev environment if applicable
var isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    require("dotenv").config();
}

// require dependencies
var express = require("express");
var path = require('path');
var db = require(path.join(__dirname + '/models'));

//express setup
var app = express();
var PORT = process.env.PORT || 3001;

//setup middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api", require('./routes/api/users'));

//sync database and start server
db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


