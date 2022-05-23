import express from "express";
import TasksCtrl from "./tasks.controller.js"

const router = express.Router();

router.route("/").get(TasksCtrl.apiGetTasks);
router.route("/id/:id").get(TasksCtrl.apiGetTaskById);
router.route("/cuisines").get(TasksCtrl.apiGetTaskCuisines);

router
  .route("/review")
  .post(function(req, res) { TasksCtrl.apiPostReview })
  .put(function(req, res) { TasksCtrl.apiUpdateReview })
  .delete(function(req, res) { TasksCtrl.apiDeleteReview })

export default router