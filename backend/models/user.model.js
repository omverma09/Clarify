import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        otp: String,
        otpExpires: Date,
        isVerified: {
            type: Boolean,
            default: false,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // password default me fetch na ho
        },

        image: {
            type: String, // profile image URL
            default:
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        banner: {
            type: String, //banner image
            default:
                "https://plus.unsplash.com/premium_photo-1661962648855-b97a8e025e0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFubmVyfGVufDB8fDB8fHww",
        },

        bio: {
            type: String,
            maxlength: 200,
            default: "",
        },

        badge: {
            type: Number,
            default: 0, // upvotes/downvotes se update hoga
        },

        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: 0
            },
        ],

        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: 0
            },
        ],
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const User = mongoose.model("User", userSchema);

export default User;
