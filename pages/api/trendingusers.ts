import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverauth";
import prisma from "@/libs/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const trendingUsers = await prisma.user.findMany({
      where: {},
      orderBy: {
        countFollowers: "desc",
      },
      take: Math.min(10, await prisma.post.count()),
    });

    return res.status(200).json(trendingUsers);
  } catch (err) {
    return res.status(400).end();
  }
}
