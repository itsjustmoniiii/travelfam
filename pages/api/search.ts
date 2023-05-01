import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverauth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      throw new Error("Invalid Search");
    }

    const searchUsers = await prisma.user.findMany({
      where: {
        username: {
          contains: q,
          mode: "insensitive",
          not: {
            equals: currentUser.username,
          },
        },
      },
    });

    return res.status(200).json(searchUsers);
  } catch (error) {
    return res.status(400).end();
  }
}
