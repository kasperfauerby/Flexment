import mongoose from 'mongoose';
import TaskModel from '../models/taskModel.js'

export const getTasks = async (req, res) => {
    try {
        const taskModels = await TaskModel.find();

        console.log(taskModels);

        res.status(200).json(taskModels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const task = req.body;

    const newTask = new TaskModel(task);

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

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');

    const task = await  TaskModel.findById(id);
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { likeCount: task.likeCount + 1 }, { new: true });

    res.json(updatedTask)
}