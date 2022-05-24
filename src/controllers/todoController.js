const pool = require("../db/db");

/*GET /api/v1/todos?status=[status]: 
get all todos (status can optionally be provided to return items of specific status)*/ 

const getAllTodos = async (req, res) => {
  const current_status = req.query.status;
  const user_id = req.user;

  if (current_status) {
    try {
      const allTodos = await pool.query(
        "SELECT u.user_email, t.* FROM users AS u LEFT JOIN todo AS t on u.user_id = t.user_id WHERE t.current_status = $1 AND u.user_id = $2",
        [current_status, user_id]
      );
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
    return;
  }
  try {
    const allTodos = await pool.query(
      "SELECT u.user_email, t.* FROM users AS u LEFT JOIN todo AS t on u.user_id = t.user_id WHERE u.user_id = $1",
      [user_id]
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
};

 // POST /api/v1/todos: create a new todo item

const createTodo =  async (req, res) => {
    try {
      const { name, current_status } = req.body;
      const user_id = req.user;
      const newTodo = await pool.query(
        "INSERT INTO todo (user_id, name, current_status) VALUES($1, $2, $3) RETURNING *",
        [user_id, name, current_status]
      );
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  }

// GET /api/v1/todos/:id get a todo item

const getTodoById = async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user;
      const todo = await pool.query(
        "SELECT * FROM todo where todo_id = $1 AND user_id = $2",
        [id, user_id]
      );
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  }

// PUT /api/v1/todos/:id update a todo

const updateTodoById = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, current_status } = req.body;
      const user_id = req.user;
      const updateTodo = await pool.query(
        "UPDATE todo SET name = $1, current_status = $2 WHERE todo_id = $3 AND user_id = $4",
        [name, current_status, id, user_id]
      );
      res.json("Todo was updated");
    } catch (err) {
      console.error(err.message);
    }
  }

// DELETE /api/v1/todos/:id delete a todo item

const deleteTodoById = async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user;
      const deleteTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2",
        [id, user_id]
      );
      res.json("Todo was deleted");
    } catch (err) {
      console.error(err.message);
    }
  }

module.exports = {
  getAllTodos,
  createTodo, 
  getTodoById, 
  updateTodoById, 
  deleteTodoById
};
