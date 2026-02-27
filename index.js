require("dotenv").config();

const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.MONGODB;



// Routes
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')

// Test route for render
app.get('/', (req, res) => {
  res.send({ message: "API is working" });
});

app.use(cors({
  origin: [
    "http://localhost:4173",
    "http://localhost:5173",
    "https://further-eight.vercel.app",
  ],
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(databaseURL);
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB Atlas.");
});

// Use Routes
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

if(require.main === module){
	app.listen(port || 4000, () => {
	    console.log(`API is now online on port ${ port || 4000 }`)
	});
}
module.exports = { app, mongoose };
