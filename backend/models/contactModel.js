const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const telephoneSchema = new Schema({
  telType:   {    type: String, required: true  },
  telNumber: {  type: Number, required: true  }
});


const contactSchema = new Schema({
  name:       { type: String, required: true  },
  email:      { type: mongoose.SchemaTypes.Email, required: true  },
  address:    { type: String, required: false },
  telephones: [ telephoneSchema ]
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;