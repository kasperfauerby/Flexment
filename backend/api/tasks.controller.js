import TasksDAO from "../dao/tasksDAO.js"

export default class TasksController {
  
  static async apiGetTasks(req, res, next) {
    const tasksPerPage = req.query.tasksPerPage ? parseInt(req.query.tasksPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.language) {
      filters.language = req.query.language
    } else if (req.query.company) {
      filters.company = req.query.company
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { tasksList, totalNumTasks } = await TasksDAO.getTasks({
      filters,
      page,
      tasksPerPage: tasksPerPage,
    })

    let response = {
      tasks: tasksList,
      page: page,
      filters: filters,
      entries_per_page: tasksPerPage,
      total_results: totalNumTasks,
    }
    res.json(response)
  }

  static async apiGetTaskById(req, res, next) {
    try {
      let id = req.params.id || {}
      let task = await TasksDAO.getTaskByID(id)
      if (!task) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(task)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetTaskLanguages(req, res, next) {
    try {
      let languages = await TasksDAO.getLanguages()
      res.json(languages)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostTask(req, res, next) {
    try {
      const taskName = req.body.taskName
      const taskDescription = req.body.taskDescription
      const taskSubjectArea = req.body.taskSubjectArea
      const programmingLanguage = req.body.programmingLanguage
      const skillLevel = req.body.skillLevel
      const imagePath = req.body.imagePath
      const companyInfo = {
        companyName: req.body.companyName,
        address: req.body.address,
      }
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const taskResponse = await TasksDAO.addTask(
        taskName,
        taskDescription,
        taskSubjectArea,
        programmingLanguage,
        skillLevel,
        imagePath,
        companyInfo,
        userInfo,
        date
      )
      res.json({ status: "successfully created" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiPutTask(req, res, next) {
    try {
      const taskId = req.body.task_id
      const taskName = req.body.taskName
      const taskDescription = req.body.taskDescription
      const taskSubjectArea = req.body.taskSubjectArea
      const programmingLanguage = req.body.programmingLanguage
      const skillLevel = req.body.skillLevel
      const imagePath = req.body.imagePath
      const companyInfo = {
        companyName: req.body.companyName,
        address: req.body.address,
      }
      const date = new Date()

      const taskResponse = await TasksDAO.updateTask(
        taskId,
        taskName,
        taskDescription,
        taskSubjectArea,
        programmingLanguage,
        skillLevel,
        imagePath,
        companyInfo,
        reg.body.user_id,
        date
      )

      var { error } = taskResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (taskResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }
      res.json({ status: "successfully updated" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteTask(reviewId, userId) {
    try {
      const taskId = req.query.id
      const userId = req.body.user_id // TODO: dont include user id in the body - better authentication
      console.log(taskId)
      const taskResponse = await TasksDAO.deleteTask(
        taskId,
        userId,
      )
      res.json({ status: "successfully deleted" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}