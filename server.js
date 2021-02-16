const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;
const port = 3001;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// the "data" directory, containing the JSON data files
const dataDir = `${__dirname}/data`;

// Endpoints:

// GET attributes
app.get('/attributes', async (req, res) => {
  const data = await fs.readFile(`${dataDir}/attributes.json`);
  // imitate some latency
  setTimeout(() => res.json(JSON.parse(data)), 500);
});

// GET tests
app.get('/tests', async (req, res) => {
  const data = await fs.readFile(`${dataDir}/tests.json`);
  // imitate some latency
  setTimeout(() => res.json(JSON.parse(data)), 500);
});

// Mock the patch endpoint
app.patch('/attributes/:id/', async (req, res) => {
  const testsState = req.body;

  // read the mock db file
  const file = await fs.readFile(`${dataDir}/attributes.json`);
  const fileObj = JSON.parse(file);

  // find the attribute being updated
  const index = fileObj.attributes.findIndex(attr => attr.id === req.params.id);

  const newTests = testsState.filter(test => test.enabled === true).map((test, i) => {
    return {
      "seq": i,
      "code": test.code,
      "level": test.level,
      "params": test.params
    }
  })

  fileObj.attributes[index].channels[0].tests = newTests;
  fs.writeFile(`${dataDir}/attributes.json`, JSON.stringify(fileObj), 'utf8', (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return res.sendStatus(500)
    }
    console.log("JSON file has been saved.");
  });
  res.sendStatus(200)
})
