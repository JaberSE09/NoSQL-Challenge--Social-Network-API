const router = require("express").Router();

const thought = require("./thought");
const user = require('./user')

router.use("/thoughts", thought);
router.use("/users", user);

module.exports = router;
