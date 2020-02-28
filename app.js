let membersDao = require("./dao/membersDao.js");
let excursionsDao = require("./dao/excursionsDao.js");


const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3001


const cors = require('cors')

    
app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json()); app.use(bodyParser.raw());



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/members/list' , cors(), (req, res) => {
    membersDao.getAllMembers()
    .then(members => res.send(members));
})

app.get('/members/:id' , cors(), (req, res) => {
    membersDao.getMemberById(req.params.id)
    .then(member => res.send(member));
})

app.delete('/members/delete/:id' , cors(), (req, res) => {
    membersDao.deleteMemberById(req.params.id)
    .then(member => res.send('Member deleted: ' + member));
})

app.post('/members' , cors(), (req, res) => {
    membersDao.addMember(req.body)
    .then(result => res.send(result));
})

app.put('/members' , cors(), (req, res) => {
    membersDao.updateMember(req.body)
    .then(result => res.send(result));
})

app.get('/excursions/list' , cors(), (req, res) => {
    excursionsDao.getAllExcursions()
    .then(excursions => res.send(excursions));
})

app.get('/excursions/:id' , cors(), (req, res) => {
    excursionsDao.getExcursionById(req.params.id)
    .then(excursion => res.send(excursion));
})

app.delete('/excursions/delete/:id' , cors(), (req, res) => {
    excursionsDao.deleteExcursionById(req.params.id)
    .then(excursion => res.send('Excursion deleted: ' + excursion));
})

app.post('/excursions' , cors(), (req, res) => {
    excursionsDao.addExcursion(req.body)
    .then(result => res.send(result));
})

app.put('/excursions' , cors(), (req, res) => {
    excursionsDao.updateExcursion(req.body)
    .then(result => res.send(result));
})

app.options('*', cors())