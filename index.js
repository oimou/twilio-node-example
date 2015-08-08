"use strict";

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
 
var express = require("express");
var app = express();

function onRequestXml(req, res) {
    res.header('Content-Type', 'text/xml');
    res.end('<?xml version="1.0" encoding="UTF-8"?>\
        <Response>\
            <Say language="ja-jp">\
                こんにちは、乱数生成サービスです。' + Math.random() + '\
            </Say>\
            <Record />\
        </Response>');
}

app.post("/service.xml", onRequestXml);

app.get("/call", function (req, res) {
    client.makeCall({
        to: process.env.TWILIO_CALL_TO,
        from: process.env.TWILIO_CALL_FROM,
        url: process.env.TWILIO_TWIXML_URL
    }, function(err, message) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.end(message.sid);
    });
});

app.listen(process.env.PORT || 3000);
