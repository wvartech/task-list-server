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

router.get('/',validateBodyParams, (req, res) => {
    res.send("List View Route");

});

module.exports = router;