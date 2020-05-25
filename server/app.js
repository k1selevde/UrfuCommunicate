const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/team', require('./routes/team.routes'))
app.use('/api/teacher', require('./routes/teacher.routes'))
app.use('/api/student', require('./routes/student.routes'))

const PORT = config.get('port') || 5000
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser:true,                                                                                                   
            useCreateIndex:true,
            useUnifiedTopology:true
        }
        )
    } catch (error) {
        console.log('Server Error', error.message)
        process.exit(1)
    }
}
start()

app.listen(PORT, () => console.log(PORT))