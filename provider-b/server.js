var express = require('express');

var app = express();
var router = express.Router();
var port = 8084;

router.get('/', function(req, res){
    var result = {
        resultCount: 20,
        message: req.query.message
    };
    console.log(result);
    res.json(result);
});

app.use('/api', router);
app.listen(port);

console.log('Provider-B listning to port ' + port);