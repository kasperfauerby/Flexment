import { request } from 'express';
import { getTask, createTask } from '../controllers/tasks';

describe('Testing controller functionality', () => {
    it('Create task function', async done => {
        const task = await createTask('taskName, taskDescription, companyName, programmingLanguages')
        expect(task.taskName).toEqual('taskName')
        done()
    })
})