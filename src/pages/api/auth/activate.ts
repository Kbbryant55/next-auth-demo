// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const { ACTIVATION_TOKEN_SECRET } = process.env;

interface UserToken {
  id: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { token } = req.body;
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken;

    const userDB = await User.findById(userToken.id);

    if (!userDB) {
      return res
        .status(400)
        .json({ message: "This account no longer exists." });
    }
    if (userDB.emailVerified == true) {
      return res
        .status(400)
        .json({ message: "Email address already verified" });
    }
    await User.findByIdAndUpdate(userDB.id, { emailVerified: true });
    res.json({
      message: "Your account has been successfully verified.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
