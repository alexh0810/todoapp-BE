const pool = require("../db/db");

const getAllTodos = async (user_id) => {
  const allTodos = await pool.query(
    "SELECT u.user_email, t.* FROM users AS u LEFT JOIN todo AS t on u.user_id = t.user_id WHERE u.user_id = $1",
    [user_id]
  );
  return allTodos.rows;
};

const getAllTodosByStatus = async (current_status, user_id) => {
  const allTodos = await pool.query(
    "SELECT u.user_email, t.* FROM users AS u LEFT JOIN todo AS t on u.user_id = t.user_id WHERE t.current_status = $1 AND u.user_id = $2",
    [current_status, user_id]
  );
  return allTodos.rows;
};

const createNewTodo = async (user_id, name, current_status) => {
  const newTodo = await pool.query(
    "INSERT INTO todo (user_id, name, current_status) VALUES($1, $2, $3) RETURNING *",
    [user_id, name, current_status]
  );
  return newTodo.rows[0];
};

const getTodoById = async (id, user_id) => {
  const todo = await pool.query(
    "SELECT * FROM todo where todo_id = $1 AND user_id = $2",
    [id, user_id]
  );
  return todo.rows[0];
};

const updateTodoById = async (name, current_status, id, user_id) => {
  const updateTodo = await pool.query(
    "UPDATE todo SET name = $1, current_status = $2 WHERE todo_id = $3 AND user_id = $4",
    [name, current_status, id, user_id]
  );
  return;
};

const deleteTodo = async (id, user_id) => {
  const deleteTodo = await pool.query(
    "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2",
    [id, user_id]
  );
  return;
};

module.exports = {
  getAllTodos,
  getAllTodosByStatus,
  createNewTodo,
  getTodoById,
  deleteTodo
};
