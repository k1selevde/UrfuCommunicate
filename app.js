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


app.get('/studentProfile', function (request, response) {
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

app.listen(5000);

