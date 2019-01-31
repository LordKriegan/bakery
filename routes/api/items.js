const router = require('express').Router();
const db = require('../../models');

//CREATE
router.post("/item", (req, res) => {
    const newItem = {
        picture: req.body.pic,
        description: req.body.desc,
        //price: req.body.chaching
        price: req.body.price,
        CategoryId: req.body.CategoryId
    }
    db.Item
        .create(newItem)
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
router.get("/item/:id", (req, res) => {
    db.Item
        .findOne({
            where: {
                id: req.params.id
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

//UPDATE
router.put("/item", (req, res) => {
    var newItem = {};
    if (req.query.picture) newItem.picture = req.query.pic;
    if (req.query.description) newItem.description = req.query.desc;
    if (req.query.price) newItem.price = req.query.price;
    if (req.query.CategoryId) newItem.CategoryId = req.query.CategoryId;
    db.Item
        .update(newItem, {
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
router.delete("/item/:id", (req, res) => {
    db.Item
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            res.json({
                success: true
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
module.exports = router;