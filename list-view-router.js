const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("List View Route");

});

module.exports = router;