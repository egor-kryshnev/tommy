const lehavaData = require('../config/lehavaData')
const arraysearch = require('../modules/arraysearch')

module.exports = {

    headerValidator: (req) => {
        if (req.header('X-AccessKey') == lehavaData.restaccess.access_key && req.header('Accept') == 'application/json') {
            return true;
        } return false;
    },
    basicHeaderValidator: (req) => {
        if (req.header('Content-Type') == 'application/json' && req.header('Accept') == 'application/json' && req.header('Authorization') == 'Basic c2VydmljZWRlc2s6U0RBZG1pbjAx') {
            return true;
        } return false;
    },
    userCallsHeaderValidator: (req) => {
        if (req.header('X-Obj-Attrs')) {
            if (req.header('X-Obj-Attrs') == "status, description, category, open_date") {
                return true;
            }
        } return false;
    },
    allNetworksWCValidator: (req) => {
        if (req.query.WC) {
            if (req.query.WC == 'class=1000792 and delete_flag=0') {
                return true;
            }
        } return false;
    },
    servicesValidator: (req) => {
        if (req.query.WC) {
            if (req.query.WC.startsWith("network=U\'") && req.header('X-Obj-Attrs') == 'service') {
                return true;
            } return false;
        } return false;
    },
    categoriesValidator: (req) => {
        if (req.query.WC) {
            if (req.query.WC.startsWith("z_impact_service=U'")) {
                return true;
            }
        } return false;
    },
    userExistsValidator: (req) => {
        if (lehavaData.users[arraysearch("T", req.query.WC.split("'")[1], lehavaData.users)]) {
            return true;
        } return false;
    },
    updatesValidator: (req) => {
        if (req.header('Content-Type') == 'application/json' && req.header('X-Obj-Attrs') == 'category, description, open_date') {
            if (req.query.WC == "type='I' and active=1 and impact=0") {
                return true;
            }
        } return false;
    },
    newCallValidator: (req) => {
        if (req.body.cr && req.body.cr.customer && req.body.cr.customer['@id'] && req.body.cr.description && req.body.cr.description) {
            return true;
        } return false;
    }
}