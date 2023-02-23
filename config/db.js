const { default: mongoose } = require('mongoose');
const { DATABASE_LOCAL } = process.env;

exports.connect = () => {
    mongoose
    .connect(DATABASE_LOCAL, {
        useNewUrlParser: true,
    })
    .then(()=> {
        console.log('Database Connection Successfull');
    })
    .catch((err)=> {
        console.log('Database Connection Failed');
        process.exit(1);
    })
}