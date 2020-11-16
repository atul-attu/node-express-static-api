let express = require('express');
//console.log(express);

let app = express();

//middleware

app.use(express.json());

app.listen(4800, () => console.log("port is working on 4800"));

// crud application methods
// create data ==== post() method
// read data === read() method
// update data === put() method
// delete data === delete() method


// app.get('/api/course', (req,res) =>{
//     res.send("Hello World");
// });


// courses static data

let courses = [
{
    id:1,
    name:"HTML5"
},
{
    id:2,
    name:"css3"
},
{
    id:3,
    name:"JQuery"
},
{
    id:4,
    name:"JavaScript"
},
{
    id:5,
    name:"Node JS"
},
{
    id:6,
    name:"Express JS"
},
];

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

// data read code concept

app.get('/api/course/:id', (req,res) => {
    //res.send(req.params.id);
    let course = courses.find((item) => item.id === parseInt(req.params.id));
    if(!course){return res.status(404).send({message:"invalid course id"})}
    res.send(course);
});


// data create code concept

app.post('/api/createcourse', (req,res) => {
    let course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(courses);
});



// data update code concept

app.put('/api/updatecourse/:id', (req,res) => {
    let course = courses.find((item) => item.id === parseInt(req.params.id));
    if(!course){return res.status(404).send({message:"invalid course id"})}
    course.name = req.body.name;
    res.send({message:'course get updated', courses : courses});
});


// data delete code concept

app.delete('/api/removecourse/:id', (req,res) => {
    let course = courses.find((item) => item.id === parseInt(req.params.id));
    if(!course){return res.status(404).send({message:"invalid course id"})}
    let courseId = courses.indexOf(course)
    let removecourse = courses.splice(courseId,1);
    res.send({message:'course removed'});
});