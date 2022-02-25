require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js');
const noteRouter = require('./routes/noteRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const userCtrl = require('./controllers/userCtrl.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

//Routes
app.use('/users', userRouter); 
app.use('/api/notes', noteRouter);

let html = '<h3>Register</h3><form action="/users/register" method="post"><label for="username">Username:</label><input type="text" id="username" name="username"><br><br><label for="email">User Id:</label><input type="text" id="email" name="email"><br><br><label for="passowrd">Password:</label><input type="password" id="password" name="password"><br><br><input type="submit" value="Submit"><h3>Login</h3></form><form action="/users/login" method="post"><label for="email">User Id:</label><input type="text" id="email" name="email"><br><br><label for="passowrd">Password:</label><input type="password" id="password" name="password"><br><br><input type="submit" value="Submit"></form><script src="app.js"></script>';


app.get('/', (req, res) => {
    res.send(html);
});

app.get(userCtrl.loginUser, (res,req)=>{
    console.log(req.body);
})

//listen server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is up and running on PORT: ", PORT);
});

//mongodb connect at quad-zero route
const URI = process.env.MONGODB_URL;
const param = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(URI, param, err => {
    if (err) throw err;
    console.log('Connected to Mongo');
});



