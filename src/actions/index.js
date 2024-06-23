"use server"
import {
    connectToDB
} from "@/database";
import {
    User
} from "@/models/user";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import {
    cookies
} from "next/headers";

export const registerUserAction = async (formData) => {
    try {
        await connectToDB();
        const {
            username,
            email,
            password
        } = formData;
        const checkUser = await User.findOne({
            email
        });
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
            username,
            email,
            password: hashedPassword
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

export const loginUserAction = async (formData) => {
    try {
        await connectToDB();
        const {
            email,
            password
        } = formData;
        const checkUser = await User.findOne({
            email
        });
        if (!checkUser) {
            return {
                success: false,
                message: "User doesn't exist ! please sign up",
            };
        }

        const checkPassword = await bcryptjs.compare(password, checkUser?.password);
        if (!checkPassword) {
            return {
                message: "Password is incorrect please check",
                success: false,
            };
        }

        const token = jwt.sign({
            id: checkUser?._id,
            email: checkUser?.email,
            username: checkUser?.username
        }, "SAMPLE KEY", {
            expiresIn: '1h'
        })

        const getCookies = cookies();
        getCookies.set('token', token);
        return {
            success: true,
            message: "Login is successfull",
        };
    } catch (err) {
        return {
            success: false,
            message: "Something went wrong! Please try again!"
        }
    }

}