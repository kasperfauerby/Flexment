import TasksDAO from "../dao/tasksDAO.js"

export default class TasksController {
  static async apiGetTasks(req, res, next) {
    const tasksPerPage = req.query.tasksPerPage ? parseInt(req.query.tasksPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
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

  static async apiGetTaskCuisines(req, res, next) {
    try {
      let cuisines = await TasksDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}