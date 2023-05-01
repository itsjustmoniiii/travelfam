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
    const trendingPosts = await prisma.post.findMany({
      where: {},
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        countLikes: "desc",
      },
      take: Math.min(10, await prisma.post.count()),
    });

    return res.status(200).json(trendingPosts);
  } catch (err) {
    return res.status(400).end();
  }
}
