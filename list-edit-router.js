const express = require('express');
const router = express.Router();
const taskArray = require('./data.js');
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
    res.status(200).json({ Tasks: taskArray});
});

router.post('/:id',validateBodyParams, function (req, res){
    const data = req.body;
    taskArray.push(data);
    res.status(201).json({createdTask: data});

});

router.delete('/:id',validateBodyParams, function (req, res){
    const id = parseInt(req.params.id); 
    const index = taskArray.findIndex(task => task.id === id);
    
    if (index !== -1) {
        const data = taskArray.splice(index,1);
        res.status(200).json({deletedTask: data});
    }else {
        res.status(404).json({error: "Task id not found " + id});
    }
    
    
});

router.put('/:id',validateBodyParams, function(req, res){
    const id = parseInt(req.params.id);
    const data = req.body;
    const index = taskArray.findIndex(task => task.id === id);
    
    if (index !== -1) {
    taskArray[index] = data;
    console.log(taskArray);
    res.status(200).json({updatedTask: taskArray[index]});
    }else{
        res.status(404).json({error: "Task id not found: " + id});
    }
});

module.exports = router;
