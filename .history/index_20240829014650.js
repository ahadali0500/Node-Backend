const express = require('express');
const app = express();

// Define your routes and middleware here

const PORT = process.env.PORT || 8000; // Set the port for the server

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Example route
app.get('/', async (req, res) => {
    // Launch headless Chrome browser
  
    res.send("hi");
});
