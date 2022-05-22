import express from "express";

const router = express.Router();

router.route("/").get((reg, res) => res.send("hello world"));

export default router