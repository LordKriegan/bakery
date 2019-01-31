const router = require('express').Router();

router.use("/api", require("./api/users"));
router.use("/api", require("./api/categories"));
router.use("/api", require("./api/items"));
//router.use("/api", require("./api/orders"));
module.exports = router;