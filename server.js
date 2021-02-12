const express = require('express');
const app = express();
const fs = require('fs').promises;
const port = process.env.PORT || 3001;
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// the "data" directory, containing the JSON data files
const dataDir = `${__dirname}/data`;

// Endpoints:

// GET companies route
app.get('/attributes', async (req, res) => {
  const data = await fs.readFile(`${dataDir}/attributes.json`);
  const companies = JSON.parse(data);
  res.json({ companies });
});

// GET companies' addresses
app.get('/tests', async (req, res) => {
  const data = await fs.readFile(`${dataDir}/tests.json`);
  const addresses = JSON.parse(data);
  res.json({ addresses });
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