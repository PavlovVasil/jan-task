const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;
const port = 3001;
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// the "data" directory, containing the JSON data files
const dataDir = `${__dirname}/data`;

// Endpoints:

// GET attributes
app.get('/attributes', async (req, res) => {
  const data = await fs.readFile(`${dataDir}/attributes.json`);
  res.json(JSON.parse(data));
});

// GET tests
app.get('/tests', async (req, res) => {
  const data = await fs.readFile(`${dataDir}/tests.json`);
  res.json(JSON.parse(data));
});

// Mock some CRUD operations
// app.delete('/companies/:id/projects/:id', (req, res) => {
//   res.sendStatus(200)
// })

// app.patch('/companies/:id/projects/:id', (req, res) => {
//   res.sendStatus(200)
// })

// app.post('/companies/:id/projects', (req, res) => {
//   createdProject = {...req.body};
//   //Mock an Id coming from the DB
//   createdProject.id = `${new Date().getTime()}`;
//   res.json(createdProject)
//})