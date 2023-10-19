const express = require('express');
const router = express.Router();

router.use(express.json());

const validateBodyParams = (req,res,next) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({error: 'No parameters defined'});
    }

    if(!req.body.id) {
        return res.status(400).json({error: 'Missing parameters'});
    }

    next();

};

router.get('/', function (req, res){
    res.send("List Edit Route");
});

router.post('/',validateBodyParams, function (req, res){
    res.send("Create Route");

});

router.delete('/',validateBodyParams, function (req, res){
    res.send("Delete Route");
});

router.put('/',validateBodyParams, function(req, res){
    res.send("Update Route");
});

module.exports = router;