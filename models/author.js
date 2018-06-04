var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for birth date
AuthorSchema.virtual('birth_formatted').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

// Virtual for death date
AuthorSchema.virtual('death_formatted').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

//Virtual for lifespan
AuthorSchema.virtual('lifespan').get(function() {
    var birth_date = this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : ''; 
    var death_date = this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
    var lifetime = birth_date + ' -- ' + death_date;
    return lifetime;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);