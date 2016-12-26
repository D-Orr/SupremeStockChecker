/**
 index.js
 author: Mykal Burris | <mykalburris@gmail.com>
 created: 21-Dec-2016
 updated: 21-Dec-2016
 version: 1
 */

const supreme = require('./../functions/supreme');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const fs = require('fs');


var app = express();
app.set('view engine', 'jade');
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/search', urlencodedParser, function (req, res) {
    console.log(req.body);
    var keywords = (req.body.search);
    if (keywords == ''){
        err = new Error ('Keywords are required');
    }

    // make sure user input isnt empty
    var err;
    if (typeof keywords == undefined){
    err = new Error ('Keywords are required');
    }

    if (err){
    err.status = 400;
    console.log(err);
    // next(err);
    } else {
        supreme(keywords, function(err, results) {
          res.render('search', {results: results});
    });
  }
});


module.exports = router;



