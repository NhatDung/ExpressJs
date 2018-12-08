var express = require('express');
var router = express.Router();
var MongoDbHelper = require('../helpers/MongoDbHelper');
var db = new MongoDbHelper();

router.post('./', function (req, res, next) {
    var data = req.body;
    db.insertDocument(data, 'orders')
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.log(error);
        })
});
module.exports = router;