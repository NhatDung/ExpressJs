var express = require('express');
var router = express.Router();
var MongoDbHelper = require('../helpers/MongoDbHelper');
var db = new MongoDbHelper();

// GET all products
router.get('/', function (req, res, next) {
    db.findDocuments({}, 'products')
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.log(error);
        })
});
// GET a product
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    db.findDocument(id, 'products')
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.log(error);
        })
});
// CREATE A PRODUCT
router.post('./add', function (req, res, next) {
    var data = reg.body;
    db.insertDocument(data, 'products')
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.log(error);
        })
})
module.exports = router;