// This is a server
// Import all modules
const express = require('express');
const path = require('path');
// Create an Express Application
const app = express();
var port = process.env.PORT || 5001;

// Set the distribution and views folder
app.set('views', path.join(__dirname, '/dist/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist/public'));

// Set up a simple route to serve our HTML  page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

app.get('/', function(req, res) {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
