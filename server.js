//setup dev environment if applicable
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    require("dotenv").config();
}

// require dependencies
const express = require("express");
const path = require('path');
const db = require(path.join(__dirname + '/models'));

//express setup
const app = express();
const PORT = process.env.PORT || 3001;

//setup middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/", require('./routes'));

//sync database and start server
db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


