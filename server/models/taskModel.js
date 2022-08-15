import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskName: String,
    taskDescription: String,
    companyName: String,
    name: String,
    creator: String,
    programmingLanguages: [String],
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