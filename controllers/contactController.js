const asyncHandler = require('express-async-handler')
const Contacts = require('../models/contactModel')

// @desc  add contact
// @route  POST /api/admin/contact/new
const addContact =  asyncHandler(async (req,res) => {
    const {name, number} = req.body;

    if(!name || !number) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const numberExist = await Contacts.findOne({number});

    if(numberExist) {
        res.status(400)
        throw new Error('contact already exist')
    }

    const contact = await Contacts.create({
        name, number, 
    })
    if(contact) {
        res.status(201).json({
           _id: contact.id,
           name: contact.name,
           number: contact.number, 
           sprofile: contact.sprofile           
        })
    } else {
        res.status(400)
        throw new Error('Invalid contact data')
    }
});

// @desc  Get contact list
// @route  GET /api/admin/contacts
const fetchContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contacts.find({});

    if(contacts) {
        res.status(200).json({
            contacts,
        });
    } else {
        res.status(400);
        throw new Error('Cannot fetch contacts due some errors');
    }
})

// @desc  Get single contact 
// @route  GET /api/admin/contact
const fetchContact = asyncHandler(async (req,res) =>{
    const cname = req.params.name;
    const cnumber = req.params.number;

    const contacts = await Contacts.findOne({name: cname, number: cnumber});

    if(contacts) {
        res.status(200).json({
            contacts,
        });
    } else {
        res.status(400);
        throw new Error('Cannot fetch contacts due some errors');
    }
})

// @desc  delete contact
// @route  GET /api/admin/contact/delete
const deleteContact = asyncHandler(async (req,res) =>{
    const contactId = req.params.id;
    try{
        const contact = await Contacts.findById(contactId);
        const data = await Contacts.remove();
        res.status(200).json({ contactId: data._id });
    } catch (error) {
        res.json(error);
        throw new Error('Cannot fetch contact due some errors');
    }
})

// @desc  update contact details
// @route  PUT /api/admin/contact/:id
const editContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    try{
        const updateContactData = {
            name: req.body.name,
            number: req.body.name,
            sprofile: req.body.sprofile,
        }

        const contact = await Contacts.findByIdAndUpdate(contactId, updateContactData, {
            new: true
        })
        res.status(200).json({
            _id: contact.id,
            name: contact.name,
            number: contact.number, 
            sprofile: contact.sprofile,            
        })
    } catch (error) {
        res.status(400).json(error);
    }
})


module.exports= { addContact, fetchContacts, fetchContact,  editContact, deleteContact,};