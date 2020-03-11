const express = require('express');
const config = require('./config/index');
const apicontroller = require('./controllers/Api.controller');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('This is the Alpha Team Lehava API Mock');
});


apicontroller(app);

let PORT = process.env.PORT || config.port;
app.listen(PORT, () => { console.log('\x1b[33m%s\x1b[0m', `Listening on port ${PORT}`) });