const express = require("express");
const router = express.Router();

const {createTask, getTask, deleteTask, completeTask} = require("../controllers/task")



router.post("/create", createTask);

router.get("/", getTask);

router.delete("/:id", deleteTask);

router.patch("/completed/:id", completeTask);

module.exports = router;
