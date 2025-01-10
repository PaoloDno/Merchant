
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connDB = require('./config/db.js')
const errorHandler = require('./middlewares/errorHandlingMiddleware.js');

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
app.use('/commerce/user', userRoute);

// Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

