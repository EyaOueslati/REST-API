const mongoose = require ('mongoose');



function connectDB (){
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
        console.log('connected to database');})
        .catch((err)=>{console.log(err)});
}
module.exports =connectDB;