const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = process.env.port || 5000
require('dotenv').config()

app.use(express.json())
const cors = require("cors")
app.use(cors(
  {
    origin: ['http://localhost:5173'],
    credentials: true
  
  }
))

const BookRoutes = require('./src/books/book.route')
app.use("/api/books", BookRoutes)

const OrderRoutes = require('./src/orders/order.route')
app.use("/api/orders", OrderRoutes)

const userRoutes= require('./src/users/user.route')
app.use("/api/auth", userRoutes)

const adminRoutes = require('./src/stats/admin.stats')
app.use("/api/admin", adminRoutes)


async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Hello World!')
  })
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().then(() => console.log("MongoDB connected successfully")).catch(err => console.log(err));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})