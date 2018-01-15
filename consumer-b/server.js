var express = require('express');

var app = express();
var router = express.Router();
var port = 895;

router.get('/', function(req, res){
    res.json({message: 'request has arrived'});
});

app.use('/api', router);
app.listen(port);

console.log('Consumer-B is listening to port ' + port);