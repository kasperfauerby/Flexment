import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskName: String,
    taskDescription: String,
    taskSubjectArea: String,
    programmingLanguage: String,
    skillLevel: String,
    companyInfo: {
        companyName: String,
        companyAddress: String
    },
    message: String,
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
    }
});

const TaskMessage = mongoose.model('TaskMessage', taskSchema);

export default TaskMessage;