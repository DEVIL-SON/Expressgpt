const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Configure bodyParser to parse JSON data
app.use(bodyParser.json());

// In-memory list of users
let users = [
  { id: 1, name: 'Saruabh', email: 'saurabh@example.com' },
  { id: 2, name: 'Vaishya', email: 'vaishya@example.com' }
];

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT /users/:id - Update a user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  updatedUser.id = userId;

  const index = users.findIndex(user => user.id === userId);

  if (index !== -1) {
    users[index] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE /users/:id - Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === userId);

  if (index !== -1) {
    const deletedUser = users[index];
    users.splice(index, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
