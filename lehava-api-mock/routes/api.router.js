const express = require('express');
let router = express.Router();
const validator = require('../validators')

router
    .route('/*')
    .get((req, res, next) => {
        if (validator.headerValidator(req)) {
            next();
        } else {
            res.status(400).send({ error: "Headers not sent properly" });
        }
    })
    .post((req, res, next) => {
        if (validator.basicHeaderValidator(req)) {
            next();
        } else {
            res.status(400).send({ error: "Headers not sent properly" });
        }
    });

module.exports = router;