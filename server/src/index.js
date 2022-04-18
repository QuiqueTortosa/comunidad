import './database'
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import { createRoles } from "./libs/initialSetup";
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.route'
import voteRoutes from './routes/vote.routes'
const cookieParser = require("cookie-parser")


const app = express()

createRoles()
app.use(express.json({limit: '1mb'}));
app.use(morgan('dev')) //Nos muestra por terminal las peticiones
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        author: 'hola',
        description: 'jeje'
    })
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/vote', voteRoutes)

const server = app.listen(4000, () => {
    console.log(`Server running on port 4000`)
})

module.exports = { app, server }
