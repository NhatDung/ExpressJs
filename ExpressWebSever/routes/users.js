var express = require('express');
var router = express.Router();
var MongoDbHelper = require('../helpers/MongoDbHelper');
var db = new MongoDbHelper();

// REGISTER
router.post('/register', function (req, res, next) {
  var data = req.body;
  db.findDocuments({ email: data.email }, 'users').then(result => {
    if (result.length > 0) {
      res.json({ ok: false, message: 'Email đã tồn tại' })
    } else {
      db.insertDocument(data, 'users')
        .then(result => {
          res.json({
            success: true,
            message: 'OK',
            result: result
          })
        }).catch(error => {
          res.json(error);
        })
    }
  }).catch(error => {
    res.status(500).json(error)
  });
});
// LOGIN
router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  db.findDocuments({ email: email, password: password }, 'users')
    .then(result => {
      if (result.length > 0) {
        res.json({
          success: true,
          message: "OK",
          result: result
        });
      } else {
        res.json({
          success: false,
        })
      }
    }).catch(error => {
      res.json(error);
    })
});
// CHANGE PASSWORD
router.put('/change-password/:id', function (req, res, next) {
  var id = req.params.id;
  var data = req.body;
  db.findDocument({ email: data.email }, 'users').then(result => {
    res.json({
      ok: false,
    })
  })
  db.updateDocument(id, data, 'users')
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.json(error);
    })
});
// DETELE ACCOUNT
router.delete('/delete-account/:id', function (req, res, next) {
  var id = req.params.id;
  db.deleteDocument(id, 'users')
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.json(error);
    })
})

module.exports = router;
