
/*
Welcome to the main entry into Nakore USSD Business Logic
*/


require('dotenv').config(); //Environment Varialble Management 
require('./config/db').connect(); //Database Connection
const express = require('express'); //Express Server
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

const farmerRoute = require('./controllers/farmControls/farmerController');
//const ussdMenu = require('./controllers/ussdControls/ussdController');
//const productRoute = require('./controllers/inventoryControls/productController');
const userRoute = require('./controllers/farmControls/userController');
const payment = require('./controllers/transactionControls/paymentController');
const agent = require('./controllers/farmControls/agentController');
const monthly = require('./controllers/transactionControls/transactionController')

app.use(helmet());
app.use(helmet.xssFilter());
app.use(cors());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api', farmerRoute);
//app.use('/api', ussdMenu);
//app.use('/api', productRoute);
app.use('/api', userRoute);
//app.use('/api', payment);
app.use('/api', agent);
//app.use('/api', monthly);



app.get('/', (req, res) => {
    res.send('USSD Server is working');
});


app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})