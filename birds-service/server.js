'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const birds = require('./birds.json');

const app = express();
const port = 8090;


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
    const { className: className, classCommonName: classCommonName, familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!className || !classCommonName || !familyName || !familyCommonName || !speciesUrl) {
        res.sendStatus(400);
        return;
    }

    birds.push({
        className: className, 
        classCommonName: classCommonName, 
        familyName: familyName,
        familyCommonName: familyCommonName,
        speciesUrl: speciesUrl,
        id: birds.length
    });
    res.sendStatus(201);
});
