const router = require('express').Router();
const db = require('../../models');

//CREATE
router.post("/category", (req, res) => {
    db.Category
        .create({
            name: req.body.name
        })
        .then((response) => {
            res.json({
                success: true,
                data: response
            })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
});
//READ
//find one
router.get("/category/:id", (req, res) => {
    db.Category
        .findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Item
            }]
        })
        .then((response) => {
            res.json({
                success: true,
                data: response
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message
            })
        });
});
//find all
router.get("/category", (req, res) => {
    db.Category
        .findAll({
            include: [{
                model: db.Item
            }]
        })
        .then((response) => {
            res.json({
                success: true,
                data: response
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
});
//UPDATE
router.put("/category", (req, res) => {
    db.Category
        .update({
            name: req.query.name
        }, {
                where: {
                    id: req.query.id
                }
            })
        .then((response) => {
            res.json({
                success: true,
                data: response
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
});
//DELETE
router.delete("/category/:id", (req, res) => {
    db.Category
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            res.json({
                success: true
            })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
});
module.exports = router;