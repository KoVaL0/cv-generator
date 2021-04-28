const {Schema, model} = require('mongoose')

const schema = new Schema({
  first_name: {type: String, required: true, minLength: 2, maxLength: 20, trim: true},
  last_name: {type: String, required: true, minLength: 2, maxLength: 20, trim: true},
  current_position: {type: String, required: true, minLength: 2, maxLength: 20, trim: true},
  skills: [{type: String, required: true, minLength: 2, maxLength: 20, trim: true}],
  projectActivities: [{
    techs: {type: Array, required: true},
    position: {type: String, required: true, minLength: 2, maxLength: 40, trim: true},
    description: {type: String, minLength: 2, maxLength: 40, trim: true},
  }],
})

module.exports = model('CV', schema)
