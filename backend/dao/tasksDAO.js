import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let tasks

export default class TaskDAO {
  static async injectDB(conn) {
    if (tasks) {
      return
    }
    try {
      tasks = await conn.db(process.env.TASK_NS).collection("tasks")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in taskDAO: ${e}`,
      )
    }
  }

  static async getTasks({
    filters = null,
    page = 0,
    tasksPerPage = 20,
  } = {}) {
    let query

    // Database search filters
    if (filters) { 
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } } // Text search
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } } // Categori search
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await tasks
        .find(query)        // Return tasks from database
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { taskList: [], totalNumTasks: 0 }
    }

    const displayCursor = cursor.limit(tasksPerPage).skip(tasksPerPage * page) // Limit result

    try {
      const tasksList = await displayCursor.toArray() // tasksList to Array
      const totalNumTasks = await tasks.countDocuments(query) // Total number of tasks

      return { tasksList: tasksList, totalNumTasks: totalNumTasks }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { tasksList: [], totalNumTasks: 0 }
    }
  }
  static async getTaskByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$task_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await tasks.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getTaskByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await tasks.distinct("cuisine") // henter alle cuisines. 'distinct' betyder at det kun bliver vist en gang (tasks kan have samme cuisine)
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
}

