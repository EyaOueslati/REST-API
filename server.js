const express = require("express");
const app = express();
const port = 5000;
const connectDB = require('./config/connectDB');

const Contact= require('./modeles/Contact');

//env variable
require('dotenv').config({path:'./config/.env'});
//midlewere to parse the data to json
app.use(express.json());


//connect to the database
connectDB();

//add user
app.post('/api/add_contact',(req,res)=>{
    const {name, lastName, email, phone} = req.body;
    const newContact = new Contact({name, lastName, email, phone});
    newContact.save().then(contact=>res.send({msg:'added',contact}))
    .catch(err=>res
    .send({msg:'erreur',err}));

})

// get all contact
app.get('/api/contacts',(req,res)=>{
    Contact.find().then((contacts)=>res.send({msg:'contacts',contacts}))
    .catch(err=>res.send({msg:'erreur',err}));
});


//update contact
app.put("/api/contacts/:contactID", (req, res) => {
    const contactID = req.params.contactID;
    Contact.findByIdAndUpdate(contactID, req.body, { new: true })
      .then((contact) => {
        if (!contact) {
          return res.send({ msg: "Not Found " });
        }
        res.send(contact);
      })
      .catch((err) => res.send({ msg: "erreur",err }));
  });


  //delete contact
  app.delete("/api/contacts/:contactID", (req, res) => {
    const id = req.params.contactID;
    Contact.findByIdAndDelete(id) 
      .then((contact) => {
        if (!contact) {
          return res.send({ msg: "Not Found " });
        }
        res.send(contact);
      })
      .catch((err) => res.send({ msg: "erreur", err }));
  });



//start server
app.listen(port,()=>{
    console.log('the server is runing')
});