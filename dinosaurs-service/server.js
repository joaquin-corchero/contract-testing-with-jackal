'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dinosaurs = require('./dinosaurs.json');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.listen(port);

console.log('Dinosaur Service listning to port ' + port);

app.get('/api/dinosaurs/:id', function (req, res, next) {
    const result = dinosaurs[req.params.id * 1];
    res.json(result);
});

app.get('/api/dinosaurs/', function (req, res) {
    res.json(dinosaurs);
});

app.post('/api/dinosaurs/', function (req, res) {
    const { name: name, era: era, diet: diet } = req.body;
    if (!name || !era || !diet) {
        res.sendStatus(400);
        return;
    }

    dinosaurs.push({ id: dinosaurs.length + 1, name: name, era: era, diet: diet });
    res.sendStatus(201);
});
