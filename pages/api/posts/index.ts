import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverauth";
import prisma from "@/libs/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    if (req.method == "POST") {
      const { text, file } = req.body;

      const post = await prisma.post.create({
        data: {
          text,
          userId: currentUser.id,
          image: file,
        },
      });

      return res.status(200).json(post);
    }
    if (req.method == "GET") {
      const { userId } = req.query;
      let posts;

      if (userId && typeof userId == "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        const user = await prisma.user.findUnique({
          where: {
            id: currentUser.id,
          },
        });

        if (!user) {
          throw new Error("Invalid ID");
        }

        let followingIds = [...user.followingIds];

        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          where: {
            OR: [{ userId: user.id }, { userId: { in: followingIds } }],
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
