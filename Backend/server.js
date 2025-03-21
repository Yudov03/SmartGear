const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const smartgearRoutes = require('./routes/smartgear'); 
const cors=require('cors');
dotenv.config();

connectDB();

const app = express();


app.use(express.json());
app.use(cors());

app.use('/smartgears', smartgearRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
