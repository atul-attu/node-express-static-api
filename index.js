let express = require('express');
//console.log(express);

let app = express();

// third party middleware

let helmet = require('helmet');
let morgan = require('morgan');

//middleware

app.use(express.json());

// in built middleware

app.use(express.static('public'));
app.use(helmet());


let middlewareWork = require('./middleware/middleware');
let config = require('config');
let courses = require('./routes/courses');

console.log(`mode : ${process.env.NODE_ENV}`);
console.log(`default mode : ${app.get('env')}`);
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

console.log(`default config:${config.get('name')}`);
console.log(`mode_email:${config.get('email')}`);
console.log(`password:${config.get("password")}`);

app.use('/api', courses);
app.listen(4800, () => console.log("port is working on 4800"));

// crud application methods
// create data ==== post() method
// read data === read() method
// update data === put() method
// delete data === delete() method


// app.get('/api/course', (req,res) =>{
//     res.send("Hello World");
// });


// custom middleware

// app.use(middlewareWork);

// app.use((req,res,next) => {
//     console.log("loading");
//     next();
// });