"use server"
import { connectToDB } from "@/database";
import { User } from "@/models/user";
import bcryptjs from 'bcryptjs';

export const registerUserAction = async (formData) => {
    try {
        await connectToDB();
        const { username, email, password } = formData;
        const checkUser = await User.findOne({ email });
        console.log(checkUser);
        if (checkUser) {
            return {
                success: false,
                message: "User already exists ! Please try with different email",
            };
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newlyCreatedUser = new User({
            username, email, password: hashedPassword
        });

        const savedUser = await newlyCreatedUser.save();
        if (savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser)),
            };
        } else {
            return {
                success: false,
                message: "Something went wrong! Please try again",
            };
        }


    } catch (err) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}