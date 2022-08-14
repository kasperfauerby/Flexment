import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskName: String,
    taskDescription: String,
    companyName: String,
    //companyAdresse: String,
    taskDescription: String,
    name: String,
    creator: String,
    programmingLanguage: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const TaskModel = mongoose.model('Tasks', taskSchema);

export default TaskModel;