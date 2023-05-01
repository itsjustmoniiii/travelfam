import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverauth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { username, bio, profileImage, isPrivate } = req.body;

    if (!username) {
      throw new Error("Missing fields");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser && existingUser.id !== currentUser.id) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        username,
        bio,
        profileImage,
        isPrivate,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
}
