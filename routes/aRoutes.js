const express = require('express')
const router = express.Router()
const { addContact, fetchContacts, fetchContact, deleteContact, editContact} = require('../controllers/contactController')

router.post('/', addContact)
router.get('/fetch-contacts', fetchContacts)
router.get('/fetch-contact', fetchContact)
router.put('/change-contact/:contactId', editContact)
router.delete('/delete-contact/:id', deleteContact)

module.exports = router;