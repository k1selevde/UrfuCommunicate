const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
var cors = require('cors')


const app = express()


app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
})



/*app.options('/register', function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    next(); // added line
});*/
app.use(express.json({ extended: true }))
// создаем парсер для данных application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// Get GROUP for teacher: (compare teacherId, token and groupId)



// teacher send message (data: id, token, groupId, message)

app.post('/sendMessage', function(request, response) {
    console.log(request.body)
    if (request.body.id === '614') {
        response.status(200).json(
            {
                data: {
                    newMessage:  {
                        text: request.body.msg,
                        time: '34.04.2020'
                    },
                },
                status: 'ok'
            })
    }
    else {
        response.status(300).json({data: {message: 'Ошибка на сервере (Teacher set new Message)'}, status: 'bad'})
    }
})







// GET STUDENTS FOR form a group

app.post('/findStudent', function(request, response) {
    console.log(request.body)
    if (request.body.searchValue === 'Юрий Петров Иванович') {
        response.status(200).json(
            {
                data: {
                    students: [
                        {studentId: '321', studentName: 'Юрий Петров Иванович', group: 'М-211'},
                        {studentId: '322', studentName: 'Юрий Петров Иванович', group: 'МИ-311'},
                        {studentId: '323', studentName: 'Юрий Петров Иванович',  group: 'МИ-411'},
                        {studentId: '324', studentName: 'Юрий Петров Иванович',    group: 'HИ-451'},
                        {studentId: '325', studentName: 'Юрий Петров Иванович',   group: 'РИ-311'},
                        {studentId: '326', studentName: 'Юрий Петров Иванович', group: 'КИ-981'},
                        {studentId: '327', studentName: 'Юрий Петров Иванович',   group: 'НИ-171'},
                    ]

                },
                status: 'ok'
            })
    }
    else if (request.body.searchValue === 'Петя Уков Наин') {
        response.status(200).json(
            {
                data: {
                    students: [
                        {studentId: '5324', studentName: 'Петя Уков Наин', group: 'М-1211'},
                        {studentId: '5322', studentName: 'Петя Уков Наин', group: 'МИ-1311'},
                        {studentId: '5323', studentName: 'Петя Уков Наин',  group: 'МИ-1411'},
                    ]

                },
                status: 'ok'
            })
    }
    else {
        response.status(300).json({data: {message: 'Ошибка на сервере (get new student)'}, status: 'bad'})
    }
})


// GET PROFILES



app.listen(5000);
