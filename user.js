let express = require('express');
let userapp = express();
userapp.use(express.json());
userapp.listen(4800, () => console.log("port is working on 4800"));


// music app static data

let users = [
    {
        id:1,
        name : "Leanne Graham",
        username : "Bret",
        email : "Sincere@april.biz"
    },
    {
        id:2,
        name : "Ervin Howell",
        username : "Antonette",
        email : "Shanna@melissa.tv"
    },
    {
        id:3,
        name : "Clementine Bauch",
        username : "Samantha",
        email : "Nathan@yesenia.net"
    },
    {
        id:4,
        name : "Patricia Lebsack",
        username : "Karianne",
        email : "Julianne.OConner@kory.org"
    }
];

// get all data

userapp.get('/api/users',(req,res) => {
    res.send(users);
});

// get data by id

userapp.get('/api/user/:id', (req,res) => {
    let user = users.find((item) => item.id === parseInt(req.params.id));
    if(!user){return res.status(404).send({message:"invalid user id"})}
    res.send(user);
});


// create data

userapp.post('/api/createuser', (req,res) => {
    let user = {
        id : users.length + 1,
        name : req.body.name,
        username : req.body.username,
        email : req.body.email
    };
    users.push(user);
    res.send(users);
});


// update data

userapp.put('/api/updateuser/:id', (req,res) => {
    let user = users.find((item) => item.id === parseInt(req.params.id));
    if(!user){return res.status(404).send({message:"invalid user id"})}
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    res.send({message:"user detail has been updated", users : users});
});


// delete data

userapp.delete('/api/deleteuser/:id', (req,res) => {
    let user = users.find((item) => item.id === parseInt(req.params.id));
    if(!user){return res.status(404).send({message:"invalid user id"})}
    let userId = users.indexOf(user)
    let deteleuser = users.splice(userId,1);
    res.send({message:'user delete'})
});