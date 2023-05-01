import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

//register endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //NOTE: limit to post method
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, username, password } = req.body;
    //NOTE: hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUserName = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    const existingUserEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUserName && existingUserEmail) {
      return res
        .status(400)
        .json({ message: "This username and email are already registered" });
    } else if (existingUserName && !existingUserEmail) {
      return res
        .status(400)
        .json({ message: "This username is already registered" });
    }
    if (existingUserEmail && !existingUserName) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    //NOTE: create user
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        hashedPassword: hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).end();
  }
}
