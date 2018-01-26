'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mammals = require('./mammals.json');

const app = express();
const port = 8085;


app.use(bodyParser.json());
app.listen(port);

console.log('Mammals Service listening to port ' + port);

const getPaged = function (pageNumber, pageSize) {
    return {
        data: mammals.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        totalNumber: mammals.length
    };
};

app.get('/api/mammals/:id', function (req, res, next) {
    console.log('GETS HERE');
    const result = mammals[req.params.id * 1];
    res.json(result);
});

//localhost:8085/api/mammals/0/5 v1
app.get('/api/mammals/:pageNumber?/:pageSize?', function (req, res) {
    const version = req.get("version");
    if (version == "1") {
        const pageNumber = req.params.pageNumber * 1;
        const pageSize = req.params.pageSize * 1;
        res.json(getPaged(pageNumber, pageSize));
        return;
    }
    res.json(mammals);
});

app.post('/api/mammals', function (req, res) {
    const { familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!familyName || !familyCommonName || !speciesUrl) {
        res.sendStatus(400);
        return;
    }

    mammals.push({ id: mammals.length, familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl });
    res.sendStatus(201);
});
