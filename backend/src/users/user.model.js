const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true,        
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
}, {
    timestamps: true,
});

/*userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const saltRounds = 10;
    this.password = bcrypt.hash(this.password, saltRounds);
    next();  

})*/

const User = mongoose.model('User', userSchema);

module.exports = User

