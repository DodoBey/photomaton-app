const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatarUrl: {type:String, required: true, default:'https://img.favpng.com/8/19/8/united-states-avatar-organization-information-png-favpng-J9DvUE98TmbHSUqsmAgu3FpGw.jpg'}, 
        bio: { type: String },
        friends: {
            sentRequest: [
                {userID: {type: String}}
            ],
            request: [
                {
                    userID: { type: String },
                    userName: { type: String },
                    avatarUrl: {type: String}
                }
            ],
            friendsList: [
                {
                    userID: { type: String },
                    userName: { type: String },
                    avatarUrl: { type: String }
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);


module.exports = User;