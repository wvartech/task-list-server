const express = require('express');
const app = express();
const PORT = 3000;

const listView = require('./list-view-router');
const listEdit = require('./list-edit-router');

const TaskArray = [{
    id:1,
    desc: 'Comer',
    status: 'pending',
},{
    id:2,
    desc: 'Correr',
    status: 'complete',
},{
    id:3,
    desc: 'Bailar',
    status: 'In Progress',
}];

app.use(express.json());

const validateRequestView = (req,res,next) => {
    if (req.method !== 'GET') {
        return res.status(400).json({ error: 'Invalid request' });
    }
    next();
};

const validateRequestEdit = (req,res,next) => {
    if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PUT') {
        return res.status(400).json({ error: 'Invalid request' });
    }
    next();
};

app.get('/', function(req, res){
    res.send("Default Root Directory");

});

app.use('/list-view',validateRequestView, listView);
app.use('/list-edit',validateRequestEdit, listEdit);

app.listen(PORT, function(){
    console.log('listening on port ' +PORT);
});