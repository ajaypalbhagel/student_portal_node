const express = require('express');
const mongoose = require("mongoose"); 
const app = express();
const studentRoutes = require('./src/api/routes/student');

app.use(express.json()); // Middleware to parse JSON data

/** mongoose setup */
const connectionStr = "mongodb://localhost:27017/studentPortal"; 
mongoose.set("strictQuery", true); 
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}; 

mongoose.connect(connectionStr).then(() => {
    console.log("Connected to db")
}).catch((error) => {
    console.log( `⁠ MongoDB connection error. Please make sure MongoDB is running. ${error} ⁠` );
});
/** end mongoose setup */
// Use the student routes
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
