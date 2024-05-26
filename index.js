const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const fs = require('fs');

app.use(express.static('public'));

// Define your routes and middleware here

const PORT = process.env.PORT || 8000; // Set the port for the server

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Example route
app.get('/', async (req, res) => {
    // Launch headless Chrome browser
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Set content of the page
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid System</title>
    <!-- Include external CSS file -->
    <link rel="stylesheet" type="text/css" href="http://localhost:8000/style.css">
    </head>
    <body>
    
    <div class="grid-container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
    </div>
    
    </body>
    </html>
    `;
    
    await page.setContent(htmlContent);

    // Generate PDF from the page content
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();

    // Set headers to indicate PDF content
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="example.pdf"'); // 'inline' will display PDF in browser

    // Send the PDF buffer as response
    res.send(pdfBuffer);
});
