const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Team = require('../models/Team')
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
                    console.log(thisTeam.subject)
                    subjectNames.push({ title: thisTeam.subject, id: student.teams[i] })
                }
            }
            console.log(subjectNames)
            return res.status(200).json({
                data: {
                    name: student.name, surname: student.surname, patronymic: student.middleName,
                    subjects: subjectNames
                },
                status: 'ok'
            })


        } catch (e) {
            return res.status(300).json({ data: { message: e.message }, status: 'bad' })
        }

    })


module.exports = router
