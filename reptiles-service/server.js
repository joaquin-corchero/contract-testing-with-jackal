'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const reptiles = require('./reptiles.json');

const app = express();
const port = 8085;


app.use(bodyParser.json());
app.listen(port);

console.log('reptiles Service listening to port ' + port);

app.get('/api/reptiles/:id', function (req, res, next) {
    console.log('GETS HERE');
    const result = reptiles[req.params.id * 1];
    res.json(result);
});

app.get('/api/reptiles/', function (req, res) {
    res.json(reptiles);
});

app.post('/api/reptiles', function (req, res) {
    const { familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!name || !diet || (extinct !== true && extinct !== false)) {
        res.sendStatus(400);
        return;
    }

    reptiles.push({familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl });
    res.sendStatus(201);
});
