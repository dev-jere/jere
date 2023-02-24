
/*
Welcome to the main entry into Nakore USSD Business Logic
*/


require('dotenv').config(); //Environment Varialble Management 
require('./config/db').connect(); //Database Connection
const express = require('express'); //Express Server
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 5050 || process.env.PORT;

const farmerRoute = require('./controllers/farmerController');
const ussdMenu = require('./controllers/ussdController');
const productRoute = require('./controllers/productController');
const userRoute = require('./controllers/userController');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api', farmerRoute);
app.use('/api', ussdMenu);
app.use('/api', productRoute);
app.use('/api', userRoute);

app.get('/', (req, res) => {
    res.send('USSD Server is working')
});


app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})