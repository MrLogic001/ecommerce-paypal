const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routes/auth/authRoute')
const adminProductsRouter = require('./routes/admin/productRoutes')
const adminOrderRouter = require('./routes/admin/orderRoutes')

const shopProductsRouter = require('./routes/shop/productRoutes')
const shopCartRouter = require('./routes/shop/cartRoutes')
const shopAddressRouter = require('./routes/shop/addressRoutes')
const shopOrderRouter = require('./routes/shop/orderRoutes')
const shopSearchRouter = require('./routes/shop/searchRoutes')
const shopReviewRouter = require('./routes/shop/reviewRoutes')

const commonFeatureRouter = require('./routes/common/featureRoutes')

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

 mongoose
  .connect("mongodb+srv://levitator023:nVPKjCdY80iIXuwp@cluster0.yh2v3yz.mongodb.net/", )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error)); 

  /*mongoose.connect("mongodb+srv://levitator023:nVPKjCdY80iIXuwp@cluster0.yh2v3yz.mongodb.net/", {
  useNewUrlParser: true,
  //useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
}) .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));*/

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

 app.get('/', (req, res) => {
  res.send('Welcome to the MERN, PayPal integrated backend!');
   });

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)

app.use('/api/common/feature', commonFeatureRouter)

app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', shopReviewRouter)

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
