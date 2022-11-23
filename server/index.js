import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from "./schema/schema.js";


import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true,
//   }));

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set("debug", true);

