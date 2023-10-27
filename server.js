const express = require('express');
const app = express();
const PORT = 3000;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const listView = require('./list-view-router');
const listEdit = require('./list-edit-router');
const protectedRoute = require('./protected-router');

const users = [
    { email: "admin@admin.com", name: "admin", password: "admin", role: "admin"},
    { email: "user@www.com", name: "user", password: "user", role: "user"}
];

app.use(express.json());

const JWTValidation = (req,res,next) => {
    const authorizationHeader = req.headers.authorization;
    let token;
    if (!authorizationHeader){
        return res.status(401).json({error: "Not Authorized"});
    }    
    if (authorizationHeader.startsWith("Bearer ")){
        token = authorizationHeader.slice(7);
    }else {
        token = authorizationHeader;
    }

    if (!token){
        return res.status(401).json({error: "Invalid Authorization Header Format"});
    }
    try{
    const user = jwt.verify(token,process.env.SECRET_KEY);
    if (!user){ return res.status(401).json({error: "Invalid Credentials"});}
    const {email,name,role} = user;
    req.email = email;
    req.name = name;
    req.role = role;}
    catch(error){
        return res.status(500).json({error: error});
    }
    

    next();
};

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

app.post('/login', (req,res) => {
    const email = req.body.email;
    const index = users.findIndex(user => user.email === email);
    if (index === -1){
        res.status(401).send({error: "Invalid user name or password"});
    }else{
        const secretKEy = process.env.SECRET_KEY;
        const token = jwt.sign(users[index], secretKEy,{algorithm: "HS256", expiresIn: 100000});
        res.status(200).header("Authorization", "Bearer " + token).json({token});
    }

});

app.use('/list-view',validateRequestView, listView);
app.use('/list-edit',validateRequestEdit, listEdit);
app.use('/protected-route', JWTValidation, protectedRoute);

app.listen(PORT, function(){
    console.log('listening on port ' +PORT);
});
