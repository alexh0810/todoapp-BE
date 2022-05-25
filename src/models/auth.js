const pool = require("../db/db");
const checkIfUserExist = async (email) => {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email,
      ]);
    return user; 
}

const createNewUser = async (email, bcryptPassword) => {
    const newUser = await pool.query(
        "INSERT INTO users (user_email, user_password) VALUES($1, $2) RETURNING *",
        [email, bcryptPassword]
      );
    return newUser.rows[0].user_id; 
}


module.exports = {
    checkIfUserExist, 
    createNewUser, 
}