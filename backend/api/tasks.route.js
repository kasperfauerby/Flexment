import express from "express";
import TasksCtrl from "./tasks.controller.js"

const router = express.Router();

router.route("/").get(TasksCtrl.apiGetTasks);
router.route("/id/:id").get(TasksCtrl.apiGetTaskById);
router.route("/cuisines").get(TasksCtrl.apiGetTaskCuisines);

export default router