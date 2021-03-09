const router = require('express').Router();
let Contact = require('../models/contactModel');

router.route('/').get((req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username   = req.body.username;
  const name       = req.body.name;
  const email      = req.body.email;
  const address    = req.body.address;
  const telephones = req.body.telephones;
  

  const newContact = new Contact({
    username,
    name,
    email,
    address,
    telephones,
  });

  newContact.save()
  .then(() => res.json('New Contact Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Contact.findById(req.params.id)
    .then(contact => {
      contact.username    = req.body.username;
      contact.name        = req.body.name;
      contact.email       = req.body.email;
      contact.address     = req.body.address;
      contact.telephones  = req.body.telephones;

      contact.save()
        .then(() => res.json('Contact updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;