// const express = require('express');
// const bodyParser = require('body-parser');

// const app  = express();
// //index root
// app.set('port',(process.env.PORT||5000))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// app.get('/', function(req,res){
//     res.send("Hello world, I am a chat bot");
// });


// //For facebook verification
// app.get('/webhook/', function(res, req){
//     if(req.query[hub.verify_token]==="test_bot"){
//         res.send(req.query['hub.challange'])
//     }
//     res.send("error,wrong token");
// });

// // //spin up the server
// app.listen(app.get('port'), function(){
//     console.log('running on the port : 5000');
// });

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'abcd1234') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    console.log("getting into the post");
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
             console.log("getting into the post 2");
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

const token = "EAAcu06jEOW8BAKaHyGKQwXv5h3jQjBYf80a0JL1at0ZAabK8J1SrzHoE8YDaWlIPU1wdjv2WBImauHtCD3OxSpMTjEv4fO8mPxi4JRHefkYZAZAPWIyrafUDnB1lDcZCwrEwSPfZAvaxdmMY7KGZAWspGvIWOZBJHwQAZCIZCM9p7IzkNP1OmlZCZBx"
function sendTextMessage(sender, text) {
    let messageData = { text:hi }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: "hi",
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


