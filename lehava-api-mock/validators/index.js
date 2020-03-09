const lehavaData = require('../config/lehavaData')

module.exports = {

    headerValidator: (req, res) => {
        if (req.header('X-AccessKey') == lehavaData.restaccess.access_key && req.header('Accept') == 'application/json') {
            return true;
        }
        res.status(400).send({ error: "Headers not sent properly" })
        return false;
    },
    basicHeaderValidator: (req, res) => {
        if (req.header('Content-Type') == 'application/json' && req.header('Accept') == 'application/json' && req.header('Authorization') == 'Basic c2VydmljZWRlc2s6U0RBZG1pbjAx') {
            return true;
        }
        res.status(400).send({ error: "Headers not sent properly" })
        return false;
    },
    userCallsHeaderValidator: (req, res) => {
        if (req.header('X-Obj-Attrs')) {
            if (req.header('X-Obj-Attrs') == "status, summary, description") {
                return true;
            }
        }
        res.status(400).send({ error: "Header is not sent in your request" })
        return false;
    },
    servicesValidator: (req, res) => {
        if (req.query.WC) {
            if (req.query.WC.startsWith("network=U\'") && req.header('X-Obj-Attrs') == 'service') {
                return true;
            }
            res.status(400).send({ error: "Parameters not sent properly" })
            return false;
        }
        res.status(400).send({ error: "No WC parameter on GET request" })
    },
    categoriesValidator: (req, res) => {
        if (req.query.WC) {
            if (req.query.WC.startsWith("z_impact_service=U'")) {
                return true;
            }
            res.status(400).send({ error: "Parameters not sent properly" })
            return false;
        }
        res.status(400).send({ error: "No WC parameter on GET request" })
    }
}