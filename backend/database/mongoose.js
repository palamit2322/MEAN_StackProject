const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // for asyn programming

const log = require('../log');

//Establising the DataBase Connection
mongoose.connect('mongodb+srv://avenger:Xly3awPsfsrMg1IJ@cluster0-qh1v3.mongodb.net/testDataBase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("DataBase Connection Establised Successfully....");
    })
    .catch(function (err) {
        console.log("Error in DataBase Connection Establisation...")
    });

module.exports = mongoose;