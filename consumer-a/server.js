var express = require('express');

var app = express();
var router = express.Router();
var port = 8090;

router.get('/', function(req, res){
    res.json({message: 'request has arrived'});
});

app.use('/api', router);
app.listen(port);

console.log(`Consumer-A is listening to port ${port}`);