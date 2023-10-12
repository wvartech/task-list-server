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


app.get('/', function(req, res){
    res.send("Default Root Directory");

});

app.use('/list-view',listView);
app.use('/list-edit',listEdit);

app.listen(PORT, function(){
    console.log('listening on port ' +PORT);
});