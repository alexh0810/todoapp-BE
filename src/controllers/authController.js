const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const signUp =  async (req, res) => {
    try {
      //1. Destructure the req.body
  
      const { email, password } = req.body;
  
      //2. Check if user exists (throw error if existed)
  
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email,
      ]);
  
      if (user.rows.length !== 0) {
        return res.status(401).send("User already exists!");
      }
      //3. Bcrypt the user password
  
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
  
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      //4. Enter new user into the DB
  
      const newUser = await pool.query(
        "INSERT INTO users (user_email, user_password) VALUES($1, $2) RETURNING *",
        [email, bcryptPassword]
      );
  
      //5. Generating JWT token
  
      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

const signIn = async (req, res) => {
    try {
      //1. destructure the req.body
  
      const { email, password } = req.body;
  
      //2. Check if user exists (if not then throw error)
  
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email,
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Password or Email is incorrect.");
      }
      //3. Check if input password is the same as DB password
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        return res.status(401).json("Password or Email is incorrect");
      }
  
      //4. Give user the JWT token
  
      const token = jwtGenerator(user.rows[0].user_id);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  const verify = async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
  module.exports = {
      signIn, 
      signUp, 
      verify
  }