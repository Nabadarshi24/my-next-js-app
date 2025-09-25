import { sendVerificationEmail } from "@/helpers/SendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { email, password } = await req.json();

        const existingUserByEmail = await UserModel.findOne({ email });
        console.log({ existingUserByEmail });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hasPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists"
                },
                    { status: 400 }
                );
            } else {
                // existingUserByEmail.password = hasPassword;
                // existingUserByEmail.verifyCode = verifyCode;
                // existingUserByEmail.verifyCodeExpiry = expiryDate;

                // await existingUserByEmail.save();
            }

        } else {

        }

        // const emailResponse = await sendVerificationEmail(email, verifyCode);

        // if (!emailResponse.success) {
        //   return Response.json({
        //     success: false,
        //     message: emailResponse.message
        //   },
        //     { status: 500 }
        //   );
        // }

        return Response.json({
            success: true,
            message: "User registered successfully. Please check your email for verification code."
        },
            { status: 201 }
        );

    } catch (error) {
        console.log("Error login user", error);

        return Response.json({
            success: false,
            message: "Error login user"
        },
            { status: 500 }
        );
    }
};
