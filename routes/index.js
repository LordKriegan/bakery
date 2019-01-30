const router = require('express').Router();

router.use("/api", require("./api/users"));
router.use("/api", require("./api/categories"));

module.exports = router;