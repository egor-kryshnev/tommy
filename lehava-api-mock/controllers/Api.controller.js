const lehavaData = require('../config/lehavaData')
const validator = require('../validators')
const arraysearch = require('../modules/arraysearch')

module.exports = (app) => {
    
    // Middlewares
    app.post('/caisd-rest/*', (req, res, next) => {
        if (validator.basicHeaderValidator(req, res)) next();
    });
    app.get('/caisd-rest/*', (req, res, next) => {
        if (validator.headerValidator(req, res)) next();
    });

    // get access key by POST request (access key is valid for one week only)
    app.post('/caisd-rest/rest_access', (req, res) => {
            res.json(lehavaData.restaccess);
    });

    // GET all networks details
    app.get('/caisd-rest/nr', (req, res) => {
        if (req.query.WC == 'class=1000792 and delete_flag=0') {
            res.json(lehavaData.all_networks);
        }
    });

    // GET all network's services by network's unique id
    app.get('/caisd-rest/z_networks_to_service', (req, res) => {
        if (validator.servicesValidator(req, res)) {
            res.json(lehavaData.services[req.query.WC.split("'")[1] - 1]);
        }
    });

    // GET all service PROBLEM categories by service's unique id
    app.get('/caisd-rest/pcat', (req, res) => {
        if (validator.categoriesValidator(req, res)) {
            res.json(lehavaData.problemCategories[req.query.WC.split("'")[1] - 1]);
        }
    });

    // GET all service REQUEST categories by service's unique id
    app.get('/caisd-rest/chgcat', (req, res) => {
        if (validator.categoriesValidator(req, res)) {
            res.json(lehavaData.requestsCategories[req.query.WC.split("'")[1] - 1]);
        }
    });

    // GET user Unique id by T username
    app.get('/caisd-rest/cnt', (req, res) => {
            res.json(lehavaData.users[arraysearch("T", req.query.WC.split("'")[1], lehavaData.users)].data);
    });

    // GET user active and non-active calls by user unique id
    app.get('/caisd-rest/cr', (req, res) => {
        if (validator.userCallsHeaderValidator(req, res)) {
            if (req.query.WC.split("active=")[1] == 0) {
                // respond Non active calls
                res.json(lehavaData.nonactivecalls[arraysearch("userUniqueId", req.query.WC.split("'")[1], lehavaData.nonactivecalls)].data);
            } else if (req.query.WC.split("active=")[1] == 1) {
                // respond active calls
                res.json(lehavaData.activecalls[arraysearch("userUniqueId", req.query.WC.split("'")[1], lehavaData.activecalls)].data);
            } else {
                res.status(400).send("Bad GET Parameters");
            }
        }
    });

    // POSTing a new request and response back the new lehava request id
    app.post('/caisd-rest/cr', (req, res) => {
            res.send(lehavaData.requests);
            lehavaData.requests.cr['@COMMON_NAME'] += 1;
    });

}