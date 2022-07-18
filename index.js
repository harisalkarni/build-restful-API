const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
});
app.post('/api/courses', (req,res) => {
    const {error} = validateCourse(req.body)
    //validate
    //if invalid, return 400 - means bad request
    
    if(error){
        // 400 means bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req,res) => {
    // look up to the course
    //if not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found') //404 


    const {error} = validateCourse(req.body)
    //validate
    //if invalid, return 400 - means bad request
    
    if(error){
        // 400 means bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    //update the course
    //return the updated course
    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}



app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found') //404 
    res.send(course)
});
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}..`))


