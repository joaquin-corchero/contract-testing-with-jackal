var express = require('express');
var request = require('request');

var app = express();
var router = express.Router();
var port = 8095;
app.use('/', router);
app.listen(port);
console.log(`dinosaur-mammals-consumer is listening to port ${port}`);

var dinoServiceUrl = 'http://localhost:8080/api/dinosaurs';
var mammalServiceUrl = 'http://localhost:8085/api/mammals';

router.get('/dinosaurs', function (req, res) {
    request.get(dinoServiceUrl, function (error, response, body) {
        if(error != null){
            res.send(`There was a problem with the request!: ${error}}` );
            return;
        };
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        var dinosaurs = JSON.parse(body);

        var html = `<html>
            <head>
            <title>The dinos</title>
            </head>
            <body>
            <h1>The dinosaurs</h1>
            <ul>
            `;

            dinosaurs.forEach(dino => {
                html += `<li>
                    <strong>${dino.name}: </strong> from the ${dino.era} was a ${dino.diet}.
                </li>`
            });

            html += "</ul></body></html>";

        res.send(html);
    });
});

router.get('/mammals', function (req, res) {
    request.get(mammalServiceUrl, function (error, response, body) {
        if(error != null){
            res.send(`There was a problem with the request!: ${error}}` );
            return;
        };
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        var dinosaurs = JSON.parse(body);

        var html = `<html>
            <head>
            <title>The mammals</title>
            </head>
            <body>
            <h1>The mammals</h1>
            <ul>
            `;

            dinosaurs.forEach(m => {
                html += `<li>
                    <strong>${m.name}: </strong> is extinct? ${m.extinct} was/is a ${m.diet}.
                </li>`
            });

            html += "</ul></body></html>";

        res.send(html);
    });
});