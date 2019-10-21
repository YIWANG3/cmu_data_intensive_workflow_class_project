const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

const mockResearcherResult = require('./mock/researcherResult');
const mockResearcherInfo = require('./mock/researcherInfo');

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
    mockResearcherResult.searchWords = req.query.keywords;
    res.status(200).json(mockResearcherResult);
});

app.get('/api/researcher', async function (req, res) {
    console.log(req.query);
    res.status(200).json(mockResearcherInfo);
});

http.listen(port, function () {
    console.log(`Express server start, listening on port:${port} ...`);
});
