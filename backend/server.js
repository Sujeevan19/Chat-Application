const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const  {notFound,errorHandler}  = require('./middleware/errorMiddleware');
dotenv.config()

connectDB();

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello")
});

app.use('/api/user',userRoutes)
app.use('api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)
   

app.get('/api/chat/:id',(req,res)=>{
    const singlechat = chats.find((c)=> c._id == req.params.id);
    res.send(singlechat);
});

const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server running in ${port}`));

