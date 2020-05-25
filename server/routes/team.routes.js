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
            const { name, subject, students, description } = req.body
            const team = new Team({ name, subject, teacher: req.user.userId, students, description })
            await team.save()
            const teacher = await User.findById(req.user.userId)
            teacher.teams.push(team)
            teacher.save()
            students.forEach(async (studentId) => {
                try {
                    const student = await User.findById(studentId);
                    student.teams.push(team)
                    student.save()
                }
                catch (e) {
                }

            });

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

router.post('/sendMessage', 
    async (req, res) => {
        try {
            const message = new Message({ text: req.body.msg, time: Date.now()})
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
            const students = await User.find({isTeacher:false, surname:req.body.searchValue})
            const studentsNames = []
            for(var i = 0; i<students.length;i++){
                studentsNames.push({studentId:students[i]._id, studentName: students[i].name, group: students[i].group})
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

    
// teacher send message (data: id, token, groupId, message)

// router.post('/sendMessage', async (req, res) => {
//     try {
//         if (!req.body)
//             return req.status(400).json("")
//         const { id, token, groupId, message } = req.body
//         const team = await Team.findById(groupId)
//         team.messages.push(new Message({ text: message, time: Date.now }))
//         res.status(200).json({
//             data: {
//                 newMessage: {
//                     text: message,
//                     time: Date.now
//                 },
//                 status: 'ok'
//             }
//         })
//     } catch (error) {
//         response.status(300).json({ data: { message: 'Ошибка на сервере (Teacher set new Message)' }, status: 'bad' })
//     }
// })



// // router.get('/teachersTeams', auth,
// //     async (req, res) => {
// //         try {
// //             const teams = await Team.find({ teacher: req.user.userId })
// //             res.json(teams)
// //         } catch (e) {
// //             res.status(500).json({ message: e.message })
// //         }

// //     })

// router.get('/students', auth, async (req, res) => {
//     try {
//         const students = await User.find({ "isTeacher": false })
//         const studentsOfTeam = [{ studentId: '', studentName: '', group: '' }]
//         const [student, setStudent] = useState([{ studentId: '', studentName: '', group: '' }])
//         students.forEach(element => {
//             studentsofTeam.push({ studentId: element.userId, studentName: element.name, group: element.group })
//         });
//         res.status(200).json({ data: { students: students }, status: 'ok' })
//     }
//     catch (e) {
//         res.status(500).json({ message: e.message })
//     }
// })


module.exports = router
