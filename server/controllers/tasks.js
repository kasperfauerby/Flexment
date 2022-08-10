import TaskMessage from '../models/taskMessage.js'

export const getTasks = async (req, res) => {
    try {
        const taskMessages = await TaskMessage.find();

        console.log(taskMessages);

        res.status(200).json(taskMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const task = req.body;

    const newTask = new TaskMessage(task);

    try {
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}