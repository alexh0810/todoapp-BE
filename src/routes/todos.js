const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization.js");

const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todoController");

router.get("/", authorization, getAllTodos);
router.post("/", authorization, createTodo);
router.get("/:id", authorization, getTodoById);
router.put("/:id", authorization, updateTodoById);
router.delete("/:id", authorization, deleteTodoById);

module.exports = router;
