import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverauth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST" && req.method != "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    //find the post, which i want to bookmark
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updateSavedIds = [...(post.savedIds || [])];

    let updatedPost;
    if (req.method == "POST") {
      updateSavedIds.push(currentUser.id);
      updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          savedIds: updateSavedIds,
        },
      });
    } else {
      updateSavedIds = updateSavedIds.filter(
        (savedId) => savedId !== currentUser.id
      );

      updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          savedIds: updateSavedIds,
        },
      });
    }
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).end();
  }
}
