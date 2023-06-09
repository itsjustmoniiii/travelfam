import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "GET" &&
    req.method !== "PATCH" &&
    req.method !== "DELETE"
  ) {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;
    const { text, file } = req.body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    if (req.method == "GET") {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return res.status(200).json(post);
    }
    if (req.method == "DELETE") {
      const post = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return res.status(200).json("deleted");
    }
    if (req.method == "PATCH") {
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          text,
          image: file,
        },
      });
      return res.status(200).json(updatedPost);
    }
  } catch (error) {
    return res.status(400).end();
  }
}
