let mongoose = require('mongoose');

//connection

mongoose.connect('mongodb://localhost:27017/mongodemo', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('db connected'))
        .catch(error => console.log(`something went wrong ${error.message}`));

    
    let schema = mongoose.Schema({
            author:{type:String},
            courses:[String],
            price:{type:Number},
            date:{type:Date, default:Date.now()},
            isPublished:{type:Boolean}
    });

    let Course = mongoose.model('courses', schema);


    // insert data

    async function CreateCourse(){
        let newCourse = new Course({
            author:'Nitin Navik',
            courses:['master in express', 'backend'],
            price:50000,
            isPublished:true
        });

        let course = await newCourse.save();
        console.log(course);
    }

    //CreateCourse();


    // fetch all data

    // comparison operators
    // $lt,$lte,$gt,$gte,$eq,$in,$nin

    // logical operators
    // and, or

    async function fetchCourses(){
        let course = await Course
                                //.find({author:'Nitin Navik',price:50000}) // select * from courses
                                //.find()
                                //.sort("author")// ascending to descending
                                //.sort("-author")//  descending to ascending

                                // .find({
                                //     price : {
                                //         $gte:20,  // find data greater than equal to 20 and less than equal to 30
                                //         $lte:30
                                //     }
                                // })

                                // .find({
                                //     price:{
                                //         $in:[20,30,40]
                                //     }
                                // })
                                //.find()
                                //.or([{price:50000,author:'Atul Dalvi'}])
                                //regular expression : this is a case sensitive
                                // .find({
                                //     author:/^Atul/ // finding from first
                                // })
                                // .find({
                                //     author:/Dalvi$/ // finding from last
                                // })
                                .find({
                                    author:/.*Navik.*/
                                })
                                .select("author price -_id")//fetch selective data exclude id

        console.log(course);
    }

    fetchCourses();