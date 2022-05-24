const router = require("express").Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization.js");
const {
    signUp,
    signIn,
    verify
} = require('../controllers/authController')

router.post("/api/v1/signup", validInfo, signUp);
router.post("/api/v1/signin", validInfo, signIn);
router.post("/api/v1/verify", authorization, verify);

module.exports = router;
