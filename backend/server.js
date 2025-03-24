
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connDB = require('./config/db.js')
const errorHandler = require('./middlewares/errorHandlingMiddleware.js');

//routes
const userRoute = require('./routes/userRoutes.js');
const productRoute = require('./routes/productRoutes.js');
const storeRoutes = require('./routes/sellerRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const cartRoutes = require("./routes/cartRoutes.js");
const checkOutRoutes = require("./routes/checkOutRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")

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
app.use('/commerce/product', productRoute);
app.use('/commerce/store', storeRoutes);
app.use('/commerce/category', categoryRoutes);
app.use('/commerce/cart', cartRoutes);
app.use('/commerce/check', checkOutRoutes);
app.use('/commerce/admin', adminRoutes);

// Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

