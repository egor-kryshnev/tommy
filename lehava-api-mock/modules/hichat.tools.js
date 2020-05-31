const hichatCredentials = require("../config/hichat.credentials")
const faker = require("faker");

module.exports = {
    contentTypeCheck: (req, res, next) => {
        if (req.headers['content-type'] == 'application/json') {
            next();
        } else {
            res.status(400).send('Please add headers: [ content-type : application/json ]');
        }
    },
    loginAuth: (req, res) => {
        if(req.body.username == hichatCredentials.username && req.body.password == hichatCredentials.password) {
            res.send(hichatCredentials.authData);
        } else {
            res.status(401).send('Wrong username or password')
        }
    },
    groupsCreate: (req, res) => {
        if(req.headers['x-auth-token'] == hichatCredentials.authData.data.authToken && req.headers['x-user-id'] == hichatCredentials.authData.data.userId && req.body.name) {
            hichatCredentials.GroupCreationResponse.group._id = faker.random.uuid();
            hichatCredentials.GroupCreationResponse.group.name = req.body.name;
            res.send(hichatCredentials.GroupCreationResponse);
        } else {
            res.status(401).send('Wrong X-Auth-Token or X-User-Id or req.body.name is missing')
        }
    },
    groupsInvite: (req, res) => {
        if(req.headers['x-auth-token'] == hichatCredentials.authData.data.authToken && req.headers['x-user-id'] == hichatCredentials.authData.data.userId && req.body.roomName && req.body.username) {
            hichatCredentials.GroupInvitationResponse.group._id = faker.random.uuid();
            hichatCredentials.GroupInvitationResponse.group.name = req.body.roomName;
            hichatCredentials.GroupInvitationResponse.group.usernames.push(req.body.username);
            res.send(hichatCredentials.GroupInvitationResponse);
        } else {
            res.status(401).send('Wrong X-Auth-Token or X-User-Id or req.body.roomId or req.body.username is missing')
        }
    }
}
                    

