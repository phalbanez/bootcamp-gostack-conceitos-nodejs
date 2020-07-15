const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository = { id: uuid(), url, title, techs, likes: 0 };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id );

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const repository = repositories[index];

  const { url, title, techs } = request.body;

  const repositoryUpdated =  { id, url, title, techs, likes: repository.likes }

  repositories[index] = repositoryUpdated;

  return response.status(200).json(repositoryUpdated);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id );

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

   repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id );
  
  if (index < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const repository = repositories[index];

  repository.likes++;

  return response.status(200).json(repository);  
});

module.exports = app;
