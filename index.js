/**
 * (c) 2021 Box, Inc.
 * Confidential - Do Not Distribute
 */

/**
 * You should not need to edit this file during the interview.
 */

const express = require('express');
const app = express();
app.use(express.json());

/**
 * Static HTML, JS, CSS assets
 * Candidate will implement TodoApp.jsx
 */

app.use(express.static('static'));

/** 
 * TodoApp Server
 * Stateful data variables (restart process to clear & reset data):
 */

let data = {};
let id = 0;

/** 
 * TodoApp Server
 * CRUD routes:
 */

app.get('/tasks', function(req, res, next) {
    let tasks = Object.keys(data).map(function(key) {
        return data[key];
    });
    console.log(req.url);
    res.json({'tasks': tasks});
});

app.post('/tasks', function(req, res, next) {
    let task = req.body;
    if (task.task) {
        task = task['task']
    }
    console.log(req.url);
    if (Object.keys(task).length) {
        task.id = `${++id}`;
        data[task.id] = task;
        console.log('Created ' + JSON.stringify(task));
        console.log('Created task %d', task.id);
        res.json({'task': task});
    } else {
        console.log('No data found in request body; no task created.');
        res.json(500, { message: 'No data found in request body.' });
    }
});

app.put('/tasks/:id', function(req, res, next) {
    let task = req.body;
    if (task && task.task) {
        task = task.task
    }
    let taskId = req.params.id;
    console.log(req.url);
    if (taskId in data) {
        console.log('Received ' + JSON.stringify(task));
        console.log('Edited task %d', taskId);
        task.id = taskId;
        Object.assign(data[taskId], task);
        res.json({'task': task});
    } else {
        console.log('Task %d not found', taskId);
        res.send(404);
    }
});

const SERVER_PORT = 8000;

app.listen(SERVER_PORT, () => {
  console.log(`\

    (c) 2021 Box, Inc.
    Confidential - Do Not Distribute

    Server started...
    Implement your code in ./static/TodoApp.jsx
  `);
});

