import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const bookmarks = await prisma.post.findMany({
      where: {
        savedIds: {
          has: userId,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(bookmarks);
  } catch (err) {
    return res.status(400).end();
  }
}
