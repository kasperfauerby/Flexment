import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskName: String,
    taskDescription: String,
    //programmingLanguage: String,
    companyInfo: {
        companyName: String,
        companyAddress: String
    },
    taskDescription: String,
    creator: String,
    programmingLanguage: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const TaskModel = mongoose.model('Tasks', taskSchema);

export default TaskModel;