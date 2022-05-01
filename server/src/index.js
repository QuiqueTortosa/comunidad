import './database'
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import multiparty from 'connect-multiparty'
import fs from 'fs'
import path from 'path'
import { createRoles } from "./libs/initialSetup";
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.route'
import voteRoutes from './routes/vote.routes'
import postRoutes from './routes/post.routes' 
import forumRoutes from './routes/forum.routes' 
import categoryRoutes from './routes/category.routes' 



const MultipartyMiddleware = multiparty({uploadDir:'./images'})
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

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/vote', voteRoutes)
app.use('/api/forum', forumRoutes)
app.use('/api/categories', categoryRoutes)

app.use('/images',express.static("images"))

app.post('/uploads', MultipartyMiddleware, (req, res) => {
    try {
        var TempPathFile = req.files.upload.path
        res.status(200).json({
            uploaded: true,
            url: `http://localhost:4000/${TempPathFile}`
        })
    }
    catch(err){
        e.status = 400;
        next(err)
    }
})

const server = app.listen(4000, () => {
    console.log(`Server running on port 4000`)
})

module.exports = { app, server }
