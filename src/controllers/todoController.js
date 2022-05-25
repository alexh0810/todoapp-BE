const pool = require("../db/db");
const todosModel = require("../models/todos");
/*GET /api/v1/todos?status=[status]: 
get all todos (status can optionally be provided to return items of specific status)*/

const getAllTodos = async (req, res) => {
  const current_status = req.query.status;
  const user_id = req.user;
  try {
    const allTodos = current_status
      ? await todosModel.getAllTodosByStatus(current_status, user_id)
      : await todosModel.getAllTodos(user_id);
    return res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
};

// POST /api/v1/todos: create a new todo item

const createTodo = async (req, res) => {
  try {
    const user_id = req.user;
    const { name, current_status } = req.body;
    const newTodo = await todosModel.createNewTodo(
      user_id,
      name,
      current_status
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
};

// GET /api/v1/todos/:id get a todo item

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user;
    const todo = await todosModel.getTodoById(id, user_id);
    res.json(todo);
  } catch (err) {
    console.error(err.message);
  }
};

// PUT /api/v1/todos/:id update a todo

const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, current_status } = req.body;
    const user_id = req.user;
    const updateTodo = await todosModel.updateTodoById(name, current_status, id, user_id);
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
};

// DELETE /api/v1/todos/:id delete a todo item

const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user;
    const deleteTodo = await todosModel.deleteTodo(id, user_id);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
