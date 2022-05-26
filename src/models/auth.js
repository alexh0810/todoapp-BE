const pool = require("../db/db");
const getUserByEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    email,
  ]);
  return res.rows && res.rows[0];
};

const getUserById = async (user_id) => {
  const res = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
  ]);
  return res.rows && res.rows[0];
}

const updateUserPassword = async (bcryptPassword, user_id) => {
  await pool.query("UPDATE users SET user_password = $1 WHERE user_id = $2", [
    bcryptPassword,
    user_id,
  ]);
};

const createNewUser = async (email, bcryptPassword) => {
  const res = await pool.query(
    "INSERT INTO users (user_email, user_password) VALUES($1, $2) RETURNING *",
    [email, bcryptPassword]
  );
  return res.rows && res.rows[0];
};




module.exports = {
  getUserByEmail,
  createNewUser,
  getUserById, 
  updateUserPassword
};
