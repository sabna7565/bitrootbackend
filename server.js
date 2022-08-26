const express = require('express')
const dotenv = require('dotenv')
const aRoutes = require('./routes/aRoutes')
const connectDB = require('./config/db')

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("API is running..");
// })

// app.get("/api/notes", (req, res) => {
//     res.send("API is runningss..");
// })

app.use('/api/admin', aRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));

