let express = require('express');
let movieapp = express();
movieapp.use(express.json());
movieapp.listen(4800, () => console.log("port is working on 4800"));


// music app static data

let movies = [
    {
        id:1,
        name:"Tanhaji: The Unsung Warrior",
        releasedate:"10/01/2020",
        ticketprice:500,
        actors:"Ajay Devgn, Saif Ali Khan, Kajol, Sharad Kelkar, Neha Sharma, Padmavati Rao, Shashank Shende"
    },
    {
        id:2,
        name:"Street Dancer 3D",
        releasedate:"24/01/2020",
        ticketprice:450,
        actors:"Varun Dhawan, Shraddha Kapoor, Nora Fatehi, Aparshakti Khurana, Prabhudeva, Raghav Juyal, Salman Yusuf Khan, Dharmesh Yelande, Caroline Wilde, Punit Pathak"
    },
    {
        id:3,
        name:"Darbar",
        releasedate:"09/01/2020",
        ticketprice:400,
        actors:"Rajinikanth, Nayanthara, Prateik Babbar, Suniel Shetty, Nivetha Thomas, Yogi Babu, Thambi Ramaiah, Jatin Sarna, Nawab Shah, Dalip Tahil"
    },
    {
        id:4,
        name:"Baaghi 3",
        releasedate:"06/03/2020",
        ticketprice:400,
        actors:"Tiger Shroff, Shraddha Kapoor, Riteish Deshmukh, Ankita Lokhande, Jaideep Ahlawat, Vijay Varma, Satish Kaushik, Virendra Saxena"
    }
];

// get all data

movieapp.get('/api/movies',(req,res) => {
    res.send(movies);
});

// get data by id

movieapp.get('/api/movie/:id', (req,res) => {
    let movie = movies.find((item) => item.id === parseInt(req.params.id));
    if(!movie){return res.status(404).send({message:"invalid movie id"})}
    res.send(movie);
});


// create data

movieapp.post('/api/createmovie', (req,res) => {
    let movie = {
        id : movies.length + 1,
        name : req.body.name,
        releasedate : req.body.releasedate,
        ticketprice : req.body.ticketprice,
        actors : req.body.actors
    };
    movies.push(movie);
    res.send(movies);
});


// update data

movieapp.put('/api/updatemovie/:id', (req,res) => {
    let movie = movies.find((item) => item.id === parseInt(req.params.id));
    if(!movie){return res.status(404).send({message:"invalid movie id"})}
    movie.name = req.body.name;
    movie.releasedate = req.body.releasedate;
    movie.ticketprice = req.body.ticketprice;
    movie.actors = req.body.actors;
    res.send({message:"movie detail has been updated", movies : movies});
});


// delete data

movieapp.delete('/api/deletemovie/:id', (req,res) => {
    let movie = movies.find((item) => item.id === parseInt(req.params.id));
    if(!movie){return res.status(404).send({message:"invalid movie id"})}
    let movieId = movies.indexOf(movie)
    let detelemovie = movies.splice(movieId,1);
    res.send({message:'movie delete'})
});