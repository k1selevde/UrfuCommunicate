const { Router } = require('express')
const router = Router()
const Team = require('../models/Team')
const User = require('../models/User')
const Message = require('../models/Message')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')

router.post('/createTeam',
    async (req, res) => {
        try {
            const students = []
            for (var i = 0; i < req.body.studentsList.length; i++) {
                students.push(req.body.studentsList[i].studentId)
            }
            console.log(students)
            const team = new Team({
                name: req.body.teamName, subject: req.body.subjectName,
                teacher: req.body.id, students: students, messages: [], description: req.body.description
            })
            console.log(team)
            await team.save()
            console.log('12')
            const teacher = await User.findById(req.body.id)
            teacher.teams.push(team)
            await teacher.save()
            for (var i = 0; i < students.length; i++) {
                const student = await User.findById(students[i]);
                student.teams.push(team)
                await student.save()
            }
            return res.status(200).json({
                data: {
                    group: {
                        groupId: team.objectId,
                        title: team.name,
                        description: team.description,
                        teacher: team.teacher,
                        messages: [
                        ],
                        studentsList: students
                    }
                },
                status: 'ok'
            }
            )
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (teacher group)' },
                    status: 'bad'
                })
        }
    });

router.post('/editTeam',
    async (req, res) => {
        try {
            const team = await Team.findById(req.body.groupId)
            const students = []
            for (var i = 0; i < req.body.studentsList.length; i++) {
                var student = await User.findById(req.body.studentsList[i].studentId)
                students.push(student)
                const f = true;
                for (var j = 0; j < student.teams.length; j++) {
                    if (team.id == student.teams[i]) {
                        f = false;
                    }
                }
                if (f) {
                    student.teams.push(team)
                    await student.save()
                }

            }
            team.students = students
            await team.save()
            return res.status(200).json({
                data: {
                    group: {
                        groupId: team.objectId,
                        title: team.name,
                        description: team.description,
                        teacher: team.teacher,
                        messages: [
                        ],
                        studentsList: students
                    }
                },
                status: 'ok'
            })
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (teacher group)' },
                    status: 'bad'
                })
        }
    });

router.post('/sendMessage',
    async (req, res) => {
        try {
            console.log(req.body)
            const message = new Message({ text: req.body.msg, time: Date.now() })
            message.save()
            console.log(message)
            const team = await User.findById(req.body.id)
            // team.messages.push(message)
            // team.save()
            console.log(team)
            return res.status(200).json(
                {
                    data: {
                        newMessage: {
                            text: message.text,
                            time: message.time.ToString()
                        },
                    },
                    status: 'ok'
                })
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (teacher group)' },
                    status: 'bad'
                })
        }
    });

router.post('/findStudent',
    async (req, res) => {
        try {
            console.log(req.body)
            const { searchValue } = req.body;
            const students = await User.find({ isTeacher: false, surname: searchValue })
            const studentsNames = []
            for (var i = 0; i < students.length; i++) {
                studentsNames.push({ studentId: students[i]._id, studentName: students[i].name, group: students[i].group })
            }
            console.log(studentsNames)
            return res.status(200).json(
                {
                    data: {
                        students: studentsNames

                    },
                    status: 'ok'
                })
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (find student)' },
                    status: 'bad'
                })
        }
    });

module.exports = router
