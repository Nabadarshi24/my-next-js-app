import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
    message: string;
    createdAt: Date;
};

const MessageSchema = new Schema<Message>({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
});

export interface User extends Document {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    userRole: string;
    isVerified?: boolean;
    isDeleted?: boolean;
}

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    userRole: {
        type: String,
        required: [true, "User role is required"],
        trim: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        // required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        // required: [true, "Verify code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
