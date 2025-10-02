import { sendVerificationEmail } from "@/helpers/SendVerificationEmail";
import { sendWelcomeEmail } from "@/helpers/SendWelcomeEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, username, password, userRole, firstName, lastName } = await req.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true
    });

    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: "User already exists"
      },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
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
        existingUserByEmail.password = hasPassword;
        // existingUserByEmail.verifyCode = verifyCode;
        // existingUserByEmail.verifyCodeExpiry = expiryDate;

        await existingUserByEmail.save();
      }

    } else {
      // const hasPassword = await bcrypt.hash(password, 10);
      // const expiryDate = new Date();
      // expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username: firstName.toLowerCase() + "." + lastName.toLowerCase(),
        firstName,
        lastName,
        email,
        password: hasPassword,
        // verifyCode,
        // verifyCodeExpiry: expiryDate,
        userRole,
        isVerified: false,
        isDeleted: false
      })

      await newUser.save();
    }

    const loginUrl = "http://localhost:5173/login";

    const emailResponse = await sendWelcomeEmail(email, username, loginUrl);

    if (!emailResponse.success) {
      return Response.json({
        success: false,
        message: emailResponse.message
      },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "User registered successfully. Please check your email for login link."
    },
      { status: 201 }
    );

  } catch (error) {
    console.log("Error registering user", error);

    return Response.json({
      success: false,
      message: "Error registering user"
    },
      { status: 500 }
    );
  }
};
