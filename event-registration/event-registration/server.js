// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create the express app
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle the form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, event } = req.body;
  const registrationData = { name, email, phone, event, timestamp: new Date() };

  // Read the existing registrations from the 'registrations.json' file
  fs.readFile('registrations.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading registrations file.');
    }

    let registrations = [];
    if (data) {
      registrations = JSON.parse(data);
    }

    // Add the new registration data
    registrations.push(registrationData);

    // Save the updated registrations back to the 'registrations.json' file
    fs.writeFile('registrations.json', JSON.stringify(registrations, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving registration data.');
      }
      res.send('Registration successful!');
    });
  });
});

// Route to view all registrations (for testing purposes)
app.get('/registrations', (req, res) => {
  fs.readFile('registrations.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading registrations file.');
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
