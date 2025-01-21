const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./model/products/products.routes");
const userRoutes = require("./model/user/user.routes");
const categoryRoutes = require("./model/category/category.routes");
const subCategoryRoutes = require("./model/subcategory/subcategory.routes");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subCategoryRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port:${port}`);
});
