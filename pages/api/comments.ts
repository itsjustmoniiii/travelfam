import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverauth";
import prisma from "@/libs/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "GET" &&
    req.method !== "DELETE"
  ) {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const commentNotificationId = "644e97402f37231489308763";
    const { postId } = req.query;
    const postIdStr = Array.isArray(postId) ? postId.join() : postId;

    if (req.method == "POST") {
      const { commentId } = req.body;
      const { writeComment } = req.body;
      if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
      }

      const comment = await prisma.comment.create({
        data: {
          text: writeComment,
          userId: currentUser.id,
          postId: postId,
        },
      });

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });
        if (post?.userId) {
          await prisma.notification.create({
            data: {
              actorId: currentUser.id,
              userId: post.userId,
              categoryId: commentNotificationId,
              postId: post.id,
              commentId: comment.id,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }

      return res.status(200).json(comment);
    }
    if (req.method == "DELETE") {
      const { commentId } = req.body;
      const deletedComment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      await prisma.notification.deleteMany({
        where: {
          categoryId: commentNotificationId,
          actorId: currentUser.id,
          commentId: commentId,
        },
      });
      return res.status(200).json("deleted");
    }
  } catch (err) {
    return res.status(400).end();
  }
}
