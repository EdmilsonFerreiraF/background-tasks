import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('common'))

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})