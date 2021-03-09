//#region Modules & Routers
const express         = require('express'),
      cors            = require('cors'),
      mongoose        = require('mongoose'),
      contactsRouter  = require('./routes/contacts');

//#endregion Modules & Routers

//#region Database Setup
const url = "mongodb+srv://sapientus:him0R2Bat00Sa1JuTsU@webcoders-ywyuj.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, { 
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
});


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to DB");
})

//#endregion Database Setup

//#region Create our App and Use the Required Modules
const app = express();
app.use(cors());
app.use(express.json());
app.use('/contacts', contactsRouter);

//#endregion Create our App and Use the Required Modules


//#region Server Setup
const port = 5000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

//#endregion Server Setup