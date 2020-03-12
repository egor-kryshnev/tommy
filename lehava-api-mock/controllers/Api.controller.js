const lehavaData = require('../config/lehavaData')
const validator = require('../validators')
const arraysearch = require('../modules/arraysearch')

module.exports = (app) => {

    // Middlewares
    app.post('/caisd-rest/*', (req, res, next) => {
        if (validator.basicHeaderValidator(req)) {
            next();
        } else {
            res.status(400).send({ error: "Headers not sent properly" });
        }
    });
    app.get('/caisd-rest/*', (req, res, next) => {
        if (validator.headerValidator(req)) {
            next();
        } else {
            res.status(400).send({ error: "Headers not sent properly" });
        }
    });

    // get access key by POST request (access key is valid for one week only)
    app.post('/caisd-rest/rest_access', (req, res) => {
        res.json(lehavaData.restaccess);
    });

    // GET all networks details
    app.get('/caisd-rest/nr', (req, res) => {
        if (req.query.WC == 'class=1000792 and delete_flag=0') {
            res.json(lehavaData.all_networks);
        } else {
            res.status(400).send({ error: "WC Parameter not set properly" });
        }
    });

    // GET all network's services by network's unique id
    app.get('/caisd-rest/z_networks_to_service', (req, res) => {
        if (validator.servicesValidator(req)) {
            res.json(lehavaData.services[req.query.WC.split("'")[1] - 1]);
        } else {
            res.status(400).send({ error: "Parameters not sent properly" });
        }
    });

    // GET all service PROBLEM categories by service's unique id
    app.get('/caisd-rest/pcat', (req, res) => {
        if (validator.categoriesValidator(req)) {
            res.json(lehavaData.problemCategories[req.query.WC.split("'")[1] - 1]);
        } else {
            res.status(400).send({ error: "No WC parameter on GET request" });
        }
    });

    // GET all service REQUEST categories by service's unique id
    app.get('/caisd-rest/chgcat', (req, res) => {
        if (validator.categoriesValidator(req)) {
            res.json(lehavaData.requestsCategories[req.query.WC.split("'")[1] - 1]);
        } else {
            res.status(400).send({ error: "No WC parameter on GET request" });
        }
    });

    // GET user Unique id by T username
    app.get('/caisd-rest/cnt', (req, res) => {
        console.log(req.query);
        
        res.json(lehavaData.users[arraysearch("T", req.query.WC.split("'")[1], lehavaData.users)].data);
    });

    // GET user active and non-active calls by user unique id
    app.get('/caisd-rest/cr', (req, res) => {
        if (validator.userCallsHeaderValidator(req)) {
            if (req.query.WC.split("active=")[1] == 0) {
                // respond Non active calls
                res.json(lehavaData.nonactivecalls[arraysearch("userUniqueId", req.query.WC.split("'")[1], lehavaData.nonactivecalls)].data);
            } else if (req.query.WC.split("active=")[1] == 1) {
                // respond active calls
                res.json(lehavaData.activecalls[arraysearch("userUniqueId", req.query.WC.split("'")[1], lehavaData.activecalls)].data);
            } else {
                res.status(400).send("Bad GET Parameters");
            }
        } if (validator.updatesValidator(req)) {
            res.send(lehavaData.updates);
        } else {
            res.status(400).send({ error: "Header is not sent in your request" });
        }
    });

    // POSTing a new request and response back the new lehava request id
    app.post('/caisd-rest/cr', (req, res) => {
        res.send(lehavaData.requests);
        lehavaData.requests.cr['@COMMON_NAME'] += 1;
    });

}