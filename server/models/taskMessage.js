import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskName: String,
    taskDescription: String,
    programmingLanguage: String,
    companyInfo: {
        companyName: String,
        companyAddress: String
    },
    taskDescription: String,
    creator: String,
    tags: [String],
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

const TaskMessage = mongoose.model('TaskMessage', taskSchema);

export default TaskMessage;