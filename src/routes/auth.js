const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization.js");
const {
    signUp,
    signIn,
    changePassword
} = require('../controllers/authController')

router.post("/api/v1/signup", validInfo, signUp);
router.post("/api/v1/signin", validInfo, signIn);
router.put("/api/v1/changePassword", authorization, changePassword);

module.exports = router;
