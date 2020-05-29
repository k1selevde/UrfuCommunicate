const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Team = require('../models/Team')
const Message = require('../models/Message')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.middleware')




router.post('/studentProfile',
    async (req, res) => {

        try {
            const student = await User.findById(req.body.id)
            const subjectNames = []
            for (var i = 0; i < student.teams.length; i++) {
                if (student.teams[i]) {
                    var thisTeam = await Team.findById(student.teams[i])
                    subjectNames.push({ title: thisTeam.subject, id: student.teams[i] })
                }
            }
            return res.status(200).json({
                data: {
                    name: student.name, surname: student.surname,
                     patronymic: student.middleName,
                    subjects: subjectNames
                },
                status: 'ok'
            })


        } catch (e) {
            return res.status(300).json({ data: { message: e.message }, status: 'bad' })
        }

    })

router.post('/studentGroup',
    async (req, res) => {

        try {
            const team = await Team.findById(req.body.subId)
            const teacher = await User.findById(team.teacher)
            const messages = []
            for(var i = 0; i<team.messages.length; i++){
                if(team.messages[i]){
                    console.log(team.messages)
                    const message = await Message.findById(team.messages[i])
                    messages.push({text: message.text, time: message.time})
                }
            }
            const students = []
            for (var i = 0; i < team.students.length; i++) {
                if (team.students[i]) {
                    const student = await User.findById(team.students[i])
                    students.push({ studentId: team.students[i], studentName: student.surname + ' ' + student.name + ' ' + student.middleName,
                     group: student.group })
                }
            }

            const files = []
            for(var i = 0; i<team.fileNames.length; i++){
                files.push({fileName: team.fileNames[i], filePath:'', getFileStatus:false})
            }

            return res.status(200).json({
                data: {
                    group: {
                        groupId: team.id,
                        title: team.name,
                        description: team.description,
                        teacher: teacher.surname + ' ' + teacher.name + ' ' + teacher.middleName,
                        messages:messages,
                        studentsList: students,
                        files: files
                    }
                },
                status: 'ok'
            })
        } catch (e) {
            return res.status(300).json({ data: { message: e.message }, status: 'bad' })
        }

    })


module.exports = router
