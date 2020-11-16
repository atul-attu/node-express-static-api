let express = require('express');
let musicapp = express();
musicapp.use(express.json());
musicapp.listen(4800, () => console.log("port is working on 4800"));


// music app static data

let songs = [
    {
        id:1,
        name:"nitin navik",
        releasedate:"12/10/2020",
        price:500,
        actors:"bipin navik"
    },
    {
        id:2,
        name:"bipin navik",
        releasedate:"12/10/2020",
        price:500,
        actors:"nitin navik"
    },
    {
        id:3,
        name:"kaustubh kokate",
        releasedate:"12/10/2020",
        price:500,
        actors:"sandeep tribhuvan"
    },
    {
        id:4,
        name:"sushil dalvi",
        releasedate:"12/10/2020",
        price:500,
        actors:"suraj dalvi"
    }
];

// get all data

musicapp.get('/api/songs',(req,res) => {
    res.send(songs);
});

// get data by id

musicapp.get('/api/song/:id', (req,res) => {
    let song = songs.find((item) => item.id === parseInt(req.params.id));
    if(!song){return res.status(404).send({message:"invalid song id"})}
    res.send(song);
});


// create data

musicapp.post('/api/createsong', (req,res) => {
    let song = {
        id : songs.length + 1,
        name : req.body.name,
        releasedate : req.body.releasedate,
        price : req.body.price,
        actors : req.body.actors
    };
    songs.push(song);
    res.send(songs);
});


// update data

musicapp.put('/api/updatesong/:id', (req,res) => {
    let song = songs.find((item) => item.id === parseInt(req.params.id));
    if(!song){return res.status(404).send({message:"invalid song id"})}
    song.name = req.body.name;
    song.releasedate = req.body.releasedate;
    song.price = req.body.price;
    song.actors = req.body.actors;
    res.send({message:"song detail has been updated", songs : songs});
});


// delete data

musicapp.delete('/api/deletesong/:id', (req,res) => {
    let song = songs.find((item) => item.id === parseInt(req.params.id));
    if(!song){return res.status(404).send({message:"invalid song id"})}
    let songId = songs.indexOf(song)
    let detelesong = songs.splice(songId,1);
    res.send({message:'song delete'})
});