const express = require('express');
const router = express.Router();

router.use(express.json());

router.use('/', (req,res) => {
    res.send("Protected Route");

});

module.exports = router;