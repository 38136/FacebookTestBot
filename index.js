const express = require('express');
const bodyParser = require('body-parser');

const app  = express();
//index root
app.set('port',(process.env.PORT||5000))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.send("Hello world, I am a chat bot");
});


//For facebook verification
app.get('/webhook/', function(res, req){
    if(req.query[hub.verify_token]==="test_bot"){
        res.send(req.query['hub.challange'])
    }
    res.send("error,wrong token");
});

// //spin up the server
app.listen(app.get('port'), function(){
    console.log('running on the port : 5000');
});
console.log("hai");



