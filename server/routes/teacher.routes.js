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




router.post('/teacherProfile',
    async (req, res) => {

        try {
            
            const teacher = await User.findById(req.body.id)
            const teamsNames = []
            for (var i = 0; i < teacher.teams.length; i++) {
                if (teacher.teams[i]) {
                    var thisTeam = await Team.findById(teacher.teams[i])
                    teamsNames.push({ title: thisTeam.name, id: teacher.teams[i] })
                }
            }
            return res.status(200).json({
                data: {
                    name: teacher.name, surname: teacher.surname, patronymic: teacher.middleName,
                    groups: teamsNames
                },
                status: 'ok'
            })


        } catch (e) {
            return res.status(300).json({ data: { message: e.message }, status: 'bad' })
        }

    })

// Get GROUP for teacher: (compare teacherId, token and groupId)
router.post('/teacherGroup',
    async (req, res) => {

        try {
            const team = await Team.findById(req.body.groupId)
            const teacher = await User.findById(team.teacher)
            const messages = []
            for(var i = 0; i<team.messages.length; i++){
                if(team.messages[i]){
                    const message = await Message.findById(team.messages[i])
                    if(message.text){
                        messages.push({text: message.text, time: message.time})
                    }
                    
                }
            }
            const students = []
            for(var i = 0; i < team.students.length;i++){
                if(team.students[i]){
                    const student = await User.findById(team.students[i])
                    students.push({studentId:team.students[i], studentName:student.surname + ' ' + student.name + ' ' + student.middleName,
                     group:student.group})
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
                        messages: messages,
                        studentsList: students,
                        files: files,
                        currentFileGetting: ''
                    }
                },
                status: 'ok'
            }
            )


        } catch (e) {
            return res.status(300).json({ data: { message: e.message }, status: 'bad' })
        }

    })


module.exports = router
