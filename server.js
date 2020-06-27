'use strict';
const { clients } = require('./data/clients');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints
    .get('/clients', (req,res) => {
        res.json(clients);
    })
    .post('/client', (req,res) => {
        console.log(req.body.name);
        
        const client = clients.find( client => client.name.includes(req.body.name));
        console.log(client);
        res.json(client);
    })
    //Example to use CURL + using POST : 
    //curl -d "{\"name\":\"Dunlap\"}" -H "Content-Type: application/json" http:/localhost:8000/clients/
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));