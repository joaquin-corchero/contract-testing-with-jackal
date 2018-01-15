var express = require('express');
var request = require('request');

var app = express();
var router = express.Router();
var port = 8090;

var dinoServiceUrl = 'http://localhost:8080/api/dinosaurs';
var tflServiceUrl = 'https://api.tfl.gov.uk/journey/journeyresults/westminster/to/bank';

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

router.get('/tfl', function (req, res) {
    request.get(tflServiceUrl, function (error, response, body) {
        if(error != null){
            res.send(`There was a problem with the request!: ${error}}` );
            return;
        };
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        var data = JSON.parse(body);

        var html = `<html>
            <head>
            <title>tfl</title>
            </head>
            <body>
            <h1>Some tfl data</h1>
            <h2>To:</h2>
            <p>
            ${data.toLocationDisambiguation.disambiguationOptions[0].place.commonName}
            </p>
            <h2>From:</h2>
            <p>
            ${data.fromLocationDisambiguation.disambiguationOptions[0].place.commonName}
            </p>
            <h2>Recomended max age minutes:</h2>
            <p>
            ${data.recommendedMaxAgeMinutes}
            </p>
            </body></html>`;

        res.send(html);
    });
});



app.use('/', router);
app.listen(port);

console.log(`dinosaur-tfl-consumer is listening to port ${port}`);