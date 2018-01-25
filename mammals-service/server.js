'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mammals = require('./mammals.json');

const app = express();
const port = 8085;


app.use(bodyParser.json());
app.listen(port);

console.log('Mammals Service listening to port ' + port);

app.get('/api/mammals/:id', function (req, res, next) {
    console.log('GETS HERE');
    const result = mammals[req.params.id * 1];
    res.json(result);
});

app.get('/api/mammals/', function (req, res) {
    res.json(mammals);
});

app.post('/api/mammals', function (req, res) {
    const { familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!name || !diet || (extinct !== true && extinct !== false)) {
        res.sendStatus(400);
        return;
    }

    mammals.push({id: mammals.length + "", familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl });
    res.sendStatus(201);
});
