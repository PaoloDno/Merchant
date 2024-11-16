
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connDB = require('./config/db.js')

//routes
const userRoute = require('./routes/userRoutes.js')

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connDB();

// App Routes
app.use('/commerce/users', userRoute);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

