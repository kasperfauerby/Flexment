import mongoose from 'mongoose';
import TaskModel from '../models/taskModel.js'

export const getTasks = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get starting index of every page
        const total = await TaskModel.countDocuments({});

        const tasks = await TaskModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: tasks, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error)
    }
}

export const getTasksBySearch = async (req, res) => {
    const { searchQuery, programmingLanguages } = req.query;

    try {
        const taskName = new RegExp(searchQuery, 'i');

        const tasks = await TaskModel.find({ $or: [ { taskName }, { programmingLanguages: { $in: programmingLanguages.split(',') } } ]});

        res.json({ data: tasks });
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}

export const createTask = async (req, res) => {
    const task = req.body;

    const newTask = new TaskModel({ ...task, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTask = async (req,  res) => {
    const { id: _id } = req.params;
    const task = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No task with that id');

    const updatedTask = await TaskModel.findByIdAndUpdate(_id, { ...task, _id }, { new: true });

    
    res.json(updatedTask);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');

    await TaskModel.findByIdAndRemove(id);

    res.json({ message: 'Task deleted successfully' });
}

export const likeTask = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'User not authenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');

    const task = await  TaskModel.findById(id);

    const index = task.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        task.likes.push(req.userId);
    } else {
        task.likes = task.likes.filter((id) => id !== String(req.userId));
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(id, task, { new: true });

    res.json(updatedTask)
}