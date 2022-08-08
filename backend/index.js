import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

import TasksDAO from "./dao/tasksDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.FLEXMENT_DB_URI, 
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        console.log("error in connecting to MongoDB")
        process.exit(1)
    })
    .then(async client => {
        await TasksDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
    })
})