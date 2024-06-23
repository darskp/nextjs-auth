import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // require: true,
        // minLength: 3,
        // maxLength: 30,
        // trim: true
    },
    email: {
        type: String,
        // require: true,
        // unique: true,
        // match: [/\S+@\S+\.\S+/, 'is invalid'],
        // lowercase: true,
        // trim: true
    },
    password: {
        type: String,
        require: true,
        // minLength: 6,
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        // ]
    }
}, {
    timestamps: true
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema);