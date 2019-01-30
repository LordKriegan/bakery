const router = require('express').Router();
const db = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//CREATE
router.post("/user", (req, res) => {
    const salt = getSalt();
    const user = {
        email: req.body.email,
        hash: getHash(req.body.password, salt),
        salt: salt,
        address: req.body.address
    }
    db.User
        .create(user)
        .then((response) => {
            res.json({
                success: true,
                token: generateJWT(response)
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        });
});
//READ
router.get("/user/:email", (req, res) => {
    db.User
        .findOne({
            where: { email: req.params.email },
            attributes: {
                exclude: ["salt", "hash", "updatedAt", "createdAt"]
            },
            include: [{
                model: db.Order
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
                error: error.message
            });
        });
});
//UPDATE
router.put("/user", (req, res) => {
    let user = {};
    if (req.query.email) {
        user.email = req.query.email.trim();
    }
    if (req.query.password) {
        user.salt = getSalt();
        user.hash = getHash(req.query.password, user.salt);
    }
    if (req.query.address) {
        user.address = req.query.address
    }
    db.User
        .update(user, {
            where: {
                id: req.query.id
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
                error: error.message
            });
        });
});
//DELETE
router.delete("/user/:id", (req, res) => {
    db.User
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
                error: error.message
            });
        });
});
//login route
router.post("/login", (req, res) => {
    const password = req.body.password;
    db.User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then((response) => {
            if (response) {
                var inputHash = getHash(password, response.salt);
                if (inputHash === response.hash) {
                    res.json({
                        success: true,
                        token: generateJWT(response)
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Invalid password"
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found!"
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                error: error.message
            })
        })
});

//helpers
function getHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
function getSalt() {
    return crypto.randomBytes(16).toString("hex");
}
function generateJWT(user) {
    let expire = new Date();
    expire.setDate(expire.getDate()+7);
    return jwt.sign({
        id: user.id,
        email: user.email,
        exp: expire.getTime()/1000
    }, process.env.JWT_SECRET);
}
module.exports = router;