const express = require('express');
const app = express();
const port = 3600;

const log = require('./log');

//for Creating the DataBase Connection
const mongoose = require('./database/mongoose');

//Import the DataBase Schema
const list = require('./database/models/list');
const task = require('./database/models/task');

//To Use JSON Data(Data Exchange Between FrontEnd and BackEnd is in JSON)
app.use(express.json());

/*CORS--Cross Origin Request Security
localhost:3600-backend api
localhost:4200-frontend
Even though domain is same but whenever the request is coming other than
3600  will be rejected by the express as unsafe
*/
// OR install cors and use app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
Creating the Restful  API for below URLs:
List: Create, Update, ReadOne, ReadAll, Delete
Task: Create, Update, ReadOne, ReadAll, Delete
*/

// to  Get all the lists:
app.get('/lists', (req, res) => {
    list.find({})
        .then(lists => res.send(lists))
        //.then(tasks=>console.log(tasks))
        .catch((err) => log.error(err));
});

// for POST Request to Save the List
app.post('/lists', (req, res) => {
    (new list({
        'title': req.body.title
    }))
    .save()
        .then((list) => res.send(list))
        .catch((err) => log.error(err));
});

//To Get One Specific List
app.get('/lists/:listId', (req, res) => {
    list.find({
            _id: req.params.listId
        })
        .then((list) => res.send(list))
        .catch((err) => log.error(err));
});

//To Update the List
//PATCH- To Update the Specific or Single Field (Recommanended for RestFul API)
//PUT- To  Update the Entire Collection or Document.
app.patch('/lists/:listId', (req, res) => {
    list.findOneAndUpdate({
            _id: req.params.listId
        }, {
            $set: req.body
        }, {
            new: true
        })
        .then((list) => res.send(list))
        .catch((err) => log.error(err));
});

//To Delete the List Item
app.delete('/lists/:listId', (req, res) => {
    //To Delete the Specific List with all its Related Tasks
    const deleteTasks = (list) => {
        task.deleteMany({
                _listId: list._id
            })
            .then(() => list)
            .catch((err) => log.error(err));
    };
    const List = list.findByIdAndDelete(req.params.listId)
        .then((list) => deleteTasks(list))
        .catch((err) => log.error(err));
    res.send(List);
});

/*
Creating the Restful  API for below URLs:
Task: Create, Update, ReadOne, ReadAll, Delete
URL: https://localhost:3600/lists/:listId/tasks/:taskId
*/
// to  Get All the Tasks Related to Specific List:
app.get('/lists/:listId/tasks', (req, res) => {
    task.find({
            _listId: req.params.listId
        })
        .then(tasks => res.send(tasks))
        //.then(tasks=>console.log(tasks))
        .catch((err) => log.error(err));
});
// to  Create the Tasks:
app.post('/lists/:listId/tasks', (req, res) => {
    (new task({
        'title': req.body.title,
        '_listId': req.params.listId
    }))
    .save()
        .then((task) => res.send(task))
        .catch((err) => log.error(err));
});

// To Get  particular Task Related to Particular List
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    task.find({
            _listId: req.params.listId,
            _id: req.params.taskId
        })
        .then(task => res.send(task))
        //.then(tasks=>console.log(tasks))
        .catch((err) => log.error(err));
});

// To Update  particular Task Related to Particular List
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    task.findOneAndUpdate({
            _listId: req.params.listId,
            _id: req.params.taskId
        }, {
            $set: req.body
        }, {
            new: true
        })
        .then(task => res.send(task))
        //.then(tasks=>console.log(tasks))
        .catch((err) => log.error(err));
});

//To Delete  particular Task Related to Particular List
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    task.findOneAndDelete({
            _listId: req.params.listId,
            _id: req.params.taskId
        })
        .then(task => res.send(task))
        //.then(tasks=>console.log(tasks))
        .catch((err) => log.error(err));
});
app.listen(port, () => console.log("Server Created at:" + port));
