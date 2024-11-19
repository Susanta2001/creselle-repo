const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo(); // Establish connection to MongoDB

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

// available routes
app.use('/api/products', require('./routes/products'))

app.listen(port, () => {
    console.log(`creselle listening on port ${port}`);
  });