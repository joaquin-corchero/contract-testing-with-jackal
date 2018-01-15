var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
var port = 8085;

var mammals = [
    {
        id: 1,
        name: 'Mammoth',
        diet: 'vegetarian',
        extinct: true
    }
];

app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);

console.log('Mammals Service listening to port ' + port);

router.get('/mammals', function (req, res) {
    res.json(mammals);
});

router.post('/mammals', function (req, res) {
    const { name: name, diet: diet, extinct: extinct} = req.body;
    if (!name || !era || !diet) {
        res.sendStatus(400);
        return;
    }

    mammals.push({ id: mammals.length + 1, name: name, era: era, diet: diet });
    res.sendStatus(201);
});
