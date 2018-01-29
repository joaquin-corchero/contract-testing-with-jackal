'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let mammals = require('./mammals.json');

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

const get = function (id) {
    return mammals.find(m => m.id === id);
};

const isString = function(input){
    return typeof input === 'string';
};

app.get('/api/mammals/:id', function (req, res, next) {
    const result = get(req.params.id);
    if(!result){
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
});

//localhost:8085/api/mammals/0/5 v1
app.get('/api/mammals/:pageNumber?/:pageSize?', function (req, res) {
    const version = req.get("version");
    if (version == "1") {
        const pageNumber = req.params.pageNumber * 1;
        const pageSize = req.params.pageSize * 1;
        return res.status(200).send(getPaged(pageNumber, pageSize));
    }
    return res.status(200).send(mammals);
});

app.post('/api/mammals', function (req, res) {
    const {id: id, familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl } = req.body;
    if (!isString(id) || !isString(familyName) || !isString(familyCommonName) || !isString(speciesUrl)) {
        return res.status(400).send({ message: "Wrong parameters"});
    }

    if(get(id)){
        return res.status(400).send({ message: "The id already exists"});
    }

    const mammal = {id: id, familyName: familyName, familyCommonName: familyCommonName, speciesUrl: speciesUrl };
    mammals.push(mammal);
    return res.status(201).send(mammal);
});

app.delete('/api/mammals/:id', function(req, res){
    var toDelete = get(req.params.id);
    if(!toDelete){
        return res.sendStatus(404);
    }

    mammals = mammals.filter(m=> m.id != req.params.id);
    return res.sendStatus(204);
});