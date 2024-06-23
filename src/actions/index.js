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

const secretkey = "SAMPLE KEY";

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

        // const newlyCreatedUser = new User({
        //     username,
        //     email,
        //     password: hashedPassword
        // });

        // const savedUser = await newlyCreatedUser.save();
        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        if (savedUser) {
            return {
                success: true,
                message: "Account has created!",
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
    await connectToDB();
    console.log("formData", formData)
    try {
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
            _id: checkUser?._id,
            email: checkUser?.email,
            username: checkUser?.username
        }, secretkey, {
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

export const fetchUserAction = async () => {
    await connectToDB();
    try {
        const getCookies = cookies();
        const token = getCookies.get("token")?.value || "";
        if (token === "") {
            return {
                success: false,
                message: "Token is invalid",
            };
        }

        const decodedToken = jwt.verify(token, secretkey);

        const getUserInfo = await User.findOne({ _id: decodedToken?._id });
        if (getUserInfo) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUserInfo)),
            };
        } else {
            return {
                success: false,
                message: "Some error occured ! Please try again",
            };
        }
    } catch (err) {
        return {
            success: false,
            message: "something went wrong"
        }
    }

}

export const logoutAction = () => {
    try {
        const getCookies = cookies();
        getCookies.set('token', "")
        return {
            success: true,
            message: "Logout successfully"
        }
    } catch (err) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}