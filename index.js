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
app.get('/webhook', function (req, res) {
    console.log(req.query['hub.mode'] + "hub_mode printing................");
    console.log(req.query['hub.verify_token'] + "verify printing................");
    console.log(req + "hub_mode req................");
    
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === 'abcd1234') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});


// //spin up the server
app.listen(app.get('port'), function(){
    console.log('running on the port : 5000');
});
// -------------------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');
// const fbgraph = require('fbgraphapi');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

// const app = express();
// //index root
// app.set('port', (process.env.PORT || 5000))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(cookieParser());

// app.get('/webhook', function (req, res) {
//     if (req.query['hub.mode'] === 'subscribe' &&
//         req.query['hub.verify_token'] === 'abcd1234') {
//         console.log("Validating webhook");
//         res.status(200).send(req.query['hub.challenge']);
//     } else {
//         console.error("Failed validation. Make sure the validation tokens match.");
//         res.sendStatus(403);
//     }
// });

// app.use(fbgraph.auth({
//     appId: "2021811441383791",
//     appSecret: "1d3a7e4893114a717eb2792a13035a6b",
//     redirectUri: "https://www.facebook.com/Flight_Link-477957565916748/",
//     apiVersion: "v2.9",
//     skipUrlPatterns: ["/favicon.ico"]
// }));

// // let accessToken = 
// // var fb = new fbgraph.Facebook(accessToken, 'v2.2');
// // fb.me(function(err, me) {
// //  console.log(me);
// // });

// app.get('/login', function (req, res) {
//     console.log('Start login');
//     fbgraph.redirectLoginForm(req, res);
// });

// app.get('/', function (req, res) {
//     if (!req.hasOwnProperty('facebook')) {
//         console.log('You are not logged in');
//         return res.redirect('/login');
//     }
//     /* See http://developers.facebook.com/docs/reference/api/ for more */
//     req.facebook.graph('/me', function (err, me) {
//         console.log(me);
//     });

//     req.facebook.graph('/me?fields=id,name', function (err, me) {
//         console.log(me);
//     });

//     req.facebook.me(function (err, me) {
//         console.log(me);
//     });

//     // /me/likes
//     req.facebook.my.likes(function (err, likes) {
//         console.log(likes);
//     });

//     res.end("Check console output");
// });

// app.get('/', function (req, res) {
//     res.send("Hello world, I am a chat bot");
// });


// //For facebook verification
// // app.get('/webhook/', function (res, req) {
// //     if (req.query[hub.verify_token] === "abcd1234") {
// //         res.send(req.query['hub.challange'])
// //     }
// //     res.send("error,wrong token");
// // });

// // //spin up the server
// app.listen(app.get('port'), function () {
//     console.log('running on the port : 5000');
// });
// console.log("hai");

// ------------------------------------------------------