const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

const researcherSearchResult = require('./mock/researcherSearchResult');
const researcherInfo = require('./mock/researcherInfo');
const paperSearchResult = require('./mock/paperSearchResult');
const paperInfo = require('./mock/paperInfo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/heartbeat', async function (req, res, next) {
    console.log('Hello Scholar Net!');
    res.status(200).json({
        success: true,
        message: 'Hello Scholar Net!'
    });
});

app.get('/api/search', async function (req, res) {
    console.log(req.query);
    let result = {};
    const type = +(req.query && req.query.type);
    switch (type) {
    case 0:
        researcherSearchResult.searchWords = req.query.keywords;
        result = researcherSearchResult;
        break;
    case 1:
        paperSearchResult.searchWords = req.query.keywords;
        result = paperSearchResult;
        break;
    default:
        result = researcherSearchResult;
    }
    res.status(200).json(result);
});

app.get('/api/researcher', async function (req, res) {
    console.log(req.query);
    res.status(200).json(researcherInfo);
});

app.get('/api/paper', async function (req, res) {
    console.log(req.query);
    res.status(200).json(paperInfo);
});

http.listen(port, function () {
    console.log(`Express server start, listening on port:${port} ...`);
});
