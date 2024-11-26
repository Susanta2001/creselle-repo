const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
const path = require('path');
const fs = require('fs');

connectToMongo(); // Establish connection to MongoDB

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

// available routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created successfully');
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`creselle listening on port ${port}`);
  });