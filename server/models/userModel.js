const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String
    },
    location: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar:String,
    avatarPublicId:String
});
userSchema.pre('save', async function(next) {
    const genSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, genSalt);
    next()
}
)
const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel