var express = require('express');
var request = require('request');

var app = express();
var router = express.Router();
var port = 8090;
var dinoServiceUrl = 'http://localhost:8080/api/mammals';
var tflServiceUrl = 'https://api.tfl.gov.uk/journey/journeyresults/westminster/to/bank';

app.use('/', router);
app.listen(port);

console.log(`consumer b is listening to port ${port}`);

router.get('/mammals', function (req, res) {
    request.get(dinoServiceUrl, function (error, response, body) {
        if (error != null) {
            res.send(`There was a problem with the request!: ${error}}`);
            return;
        };

        var html = `<html>
            <head>
            <title>The mammals</title>
            </head>
            <body>
            <h1>The mammals</h1>
            <ul>
            `;
        JSON.parse(body).forEach(dino => {
            html += `<li>
                    <strong>${m.familyName}: </strong> <a href="${m.speciesUrl}" target="_blank">${familyCommonName}</a>.
                </li>`
        });

        html += '</ul></body></html>';

        res.send(html);
    });
});

router.post('/mammals', function (req, res) {
    var postData = { name: 'Something else', era: 'Triasic', diet: 'Vegetarian' };
    var options = {
        url: dinoServiceUrl,
        body: postData,
        headers: { 'content-type': 'application/json' },
        method: 'post',
        json: true
    };
    request(options, function (error, response, body) {
        if (error != null) {
            res.send(`There was a problem with the request!: ${error}`);
            return;
        }

        if (response.statusCode != "201") {
            res.send(`The mammal wasn't created ${response.body}`);
            return;
        }

        var html = `<html>
            <head>
            <title>The mammals</title>
            </head>
            <body>
            <h1>The mammals</h1>
            <strong>mammal created!</strong>
           </body></html>`;

        res.send(html);
    });
});

router.get('/tfl', function (req, res) {
    request.get(tflServiceUrl, function (error, response, body) {
        if (error != null) {
            res.send(`There was a problem with the request!: ${error}}`);
            return;
        };

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