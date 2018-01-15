var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
var port = 8080;

var dinosaurs = [
    {
        id: 1,
        name: 'Triceratops',
        era: 'Jurassic',
        diet: 'vegetarian'
    }
];

app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);

console.log('Provider-A listning to port ' + port);

router.get('/dinosaurs', function (req, res) {
    res.json(dinosaurs);
});

router.post('/dinosaurs', function (req, res) {
    const { name: name, era: era, diet: diet } = req.body;
    if (!name || !era || !diet) {
        res.sendStatus(400);
        return;
    }

    dinosaurs.push({ id: dinosaurs.length + 1, name: name, era: era, diet: diet });
    res.sendStatus(201);
});
