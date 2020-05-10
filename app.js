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

app.post("/teacherGroup", function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    if (request.body.groupId === '2019' && request.body.id === '614')
        response.status(200).json({
                data: {
                    group: {
                        groupId: '111',
                        title: 'М-1232',
                        description: 'Лекции по четвергам',
                        teacher: 'Звездина Н.А',
                        messages: [
                            {
                                text: 'Выложены материалы для подготовки к кр(teacher)',
                                time: '14.04.2020'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр(teacher)',
                                time: '14.05.2020'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр!!',
                                time: '14.06.2020'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр!!',
                                time: '14.06.2014'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр!!',
                                time: '14.06.2015'
                            },
                        ],
                        studentsList: [
                            {studentId: '2221', studentName: 'Василий Куров Иванович', group: 'М-211'},
                            {studentId: '2222', studentName: 'Георгий Пров Иванович', group: 'МИ-311'},
                            {studentId: '2223', studentName: 'Маша Пекув Иванович',  group: 'МИ-411'},
                            {studentId: '2224', studentName: 'Кеша Паров Иванович',    group: 'HИ-451'},
                        ]
                    }
                },
                status: 'ok'
            }
        )
    else
    {
        response.status(300).json(
            {
                data: {message: 'Ошибка на сервере (teacher group)'},
                status: 'bad'
            })
    }
});


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

app.post('/studentProfile', function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    if (request.body.id === '614')
        response.status(200).json({data: {name: 'Петр', surname: 'Иванов', patronymic: 'Петрович',
                subjects: [
                    {title: 'Матанализ',id: '2015'},
                    {title: 'Алгем',id: '2016'},
                    {title: 'Физкультура',id: '2017'},
                    {title: 'Русский',id: '2018'},
                    {title: 'История',id: '2019'},
                    {title: 'Английский',id: '2020'},
                ]
            },
            status: 'ok'
        })
        //response.status(300).json({data: {message: 'Ошибка на сервере'}, status: 'bad'})
});


app.post('/teacherProfile', function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    if (request.body.id === '614')
        response.status(200).json({data: {name: 'Влад', surname: 'Владимров', patronymic: 'Егорыч',
                groups: [
                    {title: 'M-1221',id: '2015'},
                    {title: 'R-3142',id: '2016'},
                    {title: 'P-34234',id: '2017'},
                    {title: 'K-3242',id: '2018'},
                    {title: 'KP-324',id: '2019'},
                    {title: 'PP-3244',id: '2020'},
                ]
            },
            status: 'ok'
        })
    //response.status(300).json({data: {message: 'Ошибка на сервере'}, status: 'bad'})
});



// Student get group use: subId(SubjectId), id, token;


app.post("/studentGroup", function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    if (request.body.subId === '2016')
        response.status(200).json({
            data: {
                group: {
                        groupId: '111',
                        title: 'М-1232',
                        description: 'Лекции по четвергам',
                        teacher: 'Звездина Н.А',
                        messages: [
                            {
                                text: 'Выложены материалы для подготовки к кр',
                                time: '14.04.2020'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр',
                                time: '14.05.2020'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр!!',
                                time: '14.06.2020'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр!!',
                                time: '14.06.2014'
                            },
                            {
                                text: 'Выложены материалы для подготовки к кр!!',
                                time: '14.06.2015'
                            },
                        ]
                    }
                },
            status: 'ok'
        }
        )
    else
    {
        response.status(300).json({data: {message: 'Ошибка на сервере (subject group)'}, status: 'bad'})
    }
});




// AUTH

app.post("/register", function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    if (request.body.name === 'Den')
        response.status(200).json({data: {id: '614', isTeacher: true, token: 'fromRegister'},status: 'ok'})
        //response.status(300).json({data: {message: 'Ошибка на сервере'}, status: 'bad'})
});



app.post('/login', function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    if (request.body.email === 'abra@yandex.ru')
        response.status(200).json({data: {id: '614', isTeacher: false, token: 'fromLogin'}, status: 'ok'})
        //response.status(300).json({data: {message: 'Ошибка на сервере'}, status: 'bad'})
});

app.listen(5000);

