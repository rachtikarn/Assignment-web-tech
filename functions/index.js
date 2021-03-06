const functions = require('firebase-functions');

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');
var cors = require('cors');

var bears = [];
app.use(cors())
var config = {
    apiKey: "AIzaSyDKh1vaXiNDUVZlu1Slm69pwnX8zNsaLZ4",
    authDomain: "assignment-web-tech-fff2c.firebaseapp.com",
    databaseURL: "https://assignment-web-tech-fff2c.firebaseio.com",
    projectId: "assignment-web-tech-fff2c",
    storageBucket: "assignment-web-tech-fff2c.appspot.com",
    messagingSenderId: "25892150442"
  };
  firebase.initializeApp(config);

  exports.api = functions.https.onRequest(app)


router.route('/bears')
    .post(function(req, res) {
        
        var database = firebase.database().ref('member/');
            database.child(req.body.Id).set({
                ID: req.body.Id,
                NAME: req.body.Name
          });
        res.json({ message: 'Bear created!' });
});

router.route('/bears')
    .get(function(req, res) {
   // var id = req.params.id;
    var memberRef = firebase.database().ref('member/');
        memberRef.on('value', function(snapshot) {
        res.send(snapshot.val());
        });
});

router.route('/bears/:id')
    .get(function(req, res) {
        id = req.params.id;
        var member = firebase.database().ref('/member/' + id).once('value').then(function(snapshot) {
            var memberAll = (snapshot.val() ||'ANOY');
            res.send(memberAll);
          });
});

router.route('/bears/:id')
    .delete(function(req, res) {
    var delete_id = req.params.id;
    var member = firebase.database().ref('member/' + delete_id);
    member.remove();
    res.send({ message: 'Bear delete!' });
});

router.route('/bears/:id')
    .put(function(req, res) {
    var member_id = req.params.id;
    var update = {
        ID: req.body.Id,
        NAME: req.body.Name
    }
    var updateMB = {};
    var member = firebase.database().ref('member/');
    updateMB[member_id] = update;
    res.send(updateMB)
    return member.update(updateMB);
});

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);
app.listen(8000);
