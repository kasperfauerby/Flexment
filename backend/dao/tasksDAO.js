import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let tasks;

export default class TaskDAO {
  static async injectDB(conn) {
    if (tasks) {
      return;
    }
    try {
      tasks = await conn.db(process.env.TASK_NS).collection("tasks");
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
    // query with mongodb
    // Database search filters
    if (filters) { 
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } } // Text search - TODO lave til task
      } else if ("p_language" in filters) {
        query = { "p_language": { $eq: filters["p_language"] } } // Categori search
      } else if ("company" in filters) {
        query = { "company": { $eq: filters["company"] } } // Company search
      }
    }

    let cursor
    
    try {
      cursor = await tasks
        .find(query)    // Return tasks from database - If query not filled -> find all
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

  static async getLanguages() {
    let languages = []
    try {
      languages = await tasks.distinct("p_language") // henter alle languages. 'distinct' betyder at det kun bliver vist en gang (tasks kan have samme language)
      return languages
    } catch (e) {
      console.error(`Unable to get languages, ${e}`)
      return languages
    }
  }

  static async addTask(taskName, taskDescription, taskSubjectArea, programmingLanguage, skillLevel, imagePath, company, user, date) {
    try {
      const taskDoc = { taskName: taskName,
          taskDescription: taskDescription,
          taskSubjectArea: taskSubjectArea,
          programmingLanguage: programmingLanguage,
          skillLevel: skillLevel,
          imagePath: imagePath,
          companyInfo: {
            companyName: company.companyName,
            address: company.address
          },
          userInfo: {
            name: user.name,
            user_id: user._id,
          },
          date: date
      }
      return await tasks.insertOne(taskDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateTask(taskId, userId, taskName, taskDescription, taskSubjectArea, programmingLanguage, skillLevel, imagePath, company, date) {
    try {
      const updateTaskResponse = await tasks.updateOne(
        { user_id: userId, _id: ObjectId(taskId)},
        { $set: { 
          taskName: taskName, 
          taskDescription: taskDescription, 
          taskSubjectArea: taskSubjectArea,
          programmingLanguage: programmingLanguage,
          skillLevel: skillLevel,
          imagePath: imagePath,
          company: company,
          date: date  } },
      )
      
      return updateTaskResponse
    } catch (e) {
      console.error(`Unable to update task: ${e}`)
      return { error: e }
    }
  }

  static async deleteTask(taskId, userId) {

    try {
      const deleteTaskResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      })

      return deleteTaskResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}