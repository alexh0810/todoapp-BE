const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authModel = require("../models/auth");

const signUp = async (req, res) => {
  try {
    //1. Destructure the req.body

    const { email, password } = req.body;

    //2. Check if user exists (throw error if existed)

    const user = await authModel.getUserByEmail(email);

    if (user) {
      return res.status(409).send("User already exists!");
    }

    //3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter new user into the DB

    const newUser = await authModel.createNewUser(email, bcryptPassword);

    //5. Generating JWT token

    const token = jwtGenerator(newUser.user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const signIn = async (req, res) => {
  try {
    //1. destructure the req.body

    const { email, password } = req.body;

    //2. Check if user exists (if not then throw error)

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(401).json("Password or Email is incorrect.");
    }
    //3. Check if input password is the same as DB password

    const validPassword = await bcrypt.compare(
      password,
      user.user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //4. Give user the JWT token
    const token = jwtGenerator(user.user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  const user_id = req.user;

  try {
    // check if user exists
    const user = await authModel.getUserById(user_id);
    if (!user) {
      return res.status(404).json("User does not exist!");
    }

    // Check if old password is the same as DB password
    const validPassword = await bcrypt.compare(
        old_password,
        user.user_password
    );

    if (!validPassword) {
      return res.status(400).json("Old password is not correct.");
    }

    // Salt new password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(new_password, salt);

    // Update user with new password
    await authModel.updateUserPassword(bcryptPassword, user_id);

    // Generate new token
    const token = jwtGenerator(user_id);

    res.json({ token })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  signIn,
  signUp,
  changePassword
};
