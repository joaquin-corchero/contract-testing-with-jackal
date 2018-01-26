var express = require('express');
var request = require('request');

var app = express();
var router = express.Router();
var port = 8095;
app.use('/', router);
app.listen(port);
console.log(`Consumer A is listening to port ${port}`);

var birdServiceUrl = 'http://localhost:8090/api/birds';

router.get('/birds', function (req, res) {
    request.get(birdServiceUrl, function (error, response, body) {
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
            <title>The birds</title>
            </head>
            <body>
            <h1>The birds</h1>
            <ul>
            `;

            dinosaurs.forEach(m => {
                html += `<li>
                    <strong>${m.familyName}: </strong> <a href="${m.speciesUrl}" target="_blank">${familyCommonName}</a>.
                </li>`
            });

            html += "</ul></body></html>";

        res.send(html);
    });
});