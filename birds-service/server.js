'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const birds = require('./birds.json');

const app = express();
const port = 8085;


app.use(bodyParser.json());
app.listen(port);

console.log('Birds Service listening to port ' + port);

app.get('/api/birds/:id', function (req, res, next) {
    console.log('GETS HERE');
    const result = birds[req.params.id * 1];
    res.json(result);
});

app.get('/api/birds/', function (req, res) {
    res.json(birds);
});

app.post('/api/birds', function (req, res) {
    const { familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!name || !diet || (extinct !== true && extinct !== false)) {
        res.sendStatus(400);
        return;
    }

    birds.push({familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl });
    res.sendStatus(201);
});
