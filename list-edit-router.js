const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
    res.send("List Edit Route");
});

router.post('/', function (req, res){
    res.send("Create Route");

});

router.delete('/', function (req, res){
    res.send("Delete Route");
});

router.patch('/', function(req, res){
    res.send("Update Route");
});

module.exports = router;