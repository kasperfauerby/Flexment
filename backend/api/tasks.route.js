import express from "express";
import TasksCtrl from "./tasks.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router();

router.route("/").get(TasksCtrl.apiGetTasks);
router.route("/id/:id").get(TasksCtrl.apiGetTaskById);
router.route("/languages").get(TasksCtrl.apiGetTaskLanguages);

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router