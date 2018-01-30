'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let birds = require('./birds.json');

const app = express();
const port = 8090;

app.use(bodyParser.json());
app.listen(port);

console.log('Birds Service listening to port ' + port);

const getPaged = function (pageNumber, pageSize) {
    return {
        data: birds.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        totalNumber: birds.length
    };
};

const get = function (id) {
    return birds.find(m => m.id === id);
};

const isString = function(input){
    return typeof input === 'string';
};

app.get('/api/birds/:id', function (req, res, next) {
    const result = get(req.params.id);
    if(!result){
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
});

//localhost:8085/api/birds/0/5 v1
app.get('/api/birds/:pageNumber?/:pageSize?', function (req, res) {
    const version = req.get("version");
    if (version == "1") {
        const pageNumber = req.params.pageNumber * 1;
        const pageSize = req.params.pageSize * 1;
        return res.status(200).send(getPaged(pageNumber, pageSize));
    }
    return res.status(200).send(birds);
});

app.post('/api/birds', function (req, res) {
    const {id: id, familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!isString(id) || !isString(familyName) || !isString(familyCommonName) || !isString(speciesUrl)) {
        return res.status(400).send({ message: "Wrong parameters"});
    }

    if(get(id)){
        return res.status(400).send({ message: "The id already exists"});
    }

    const bird = {id: id, familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl };
    birds.push(bird);
    return res.status(201).send(bird);
});

app.delete('/api/birds/:id', function(req, res){
    var toDelete = get(req.params.id);
    if(!toDelete){
        return res.sendStatus(404);
    }

    birds = birds.filter(m=> m.id != req.params.id);
    return res.sendStatus(200);
});