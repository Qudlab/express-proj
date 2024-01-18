const express = require('express');
const app = express();
const PORT = 3000;

// Custom middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    // If it's within working hours, proceed to the next middleware
    next();
  } else {
    // If it's outside working hours, return a message
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Use the workingHoursMiddleware for all routes
app.use(workingHoursMiddleware);

// Set up static files and views
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
