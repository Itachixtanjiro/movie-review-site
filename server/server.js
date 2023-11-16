const express = require('express');
const app = express();
const port = process.env.PORT||5000;
require('dotenv').config();
const dbConfig= require('./config/dbConfig.js'); 
var cors = require('cors')
app.use(cors())
app.use(express.json());
const userRoute = require('./routes/usersRoute.js');
app.use('/api/users', userRoute);
app.listen(port,()=> console.log('Server started on port' ,{port} ));