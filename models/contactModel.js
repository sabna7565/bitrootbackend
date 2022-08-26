const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
   name: {
    type: String,
    required: [true, 'Please add name']
   },    
   number: {
    type: Number,
    required: [true, 'Please add number'],
    unique: true
   }, 
   sprofile: {
      type: String, 
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"     
   }
  
}, 
{
   timestamps: true 
})

module.exports = mongoose.model('Contacts', contactSchema)
