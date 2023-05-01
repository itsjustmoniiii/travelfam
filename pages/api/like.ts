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
    const likeNotificationId = "644e97332f37231489308762";
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updateLikedIds = [...(post.likedIds || [])];

    let updatedPost;
    if (req.method == "POST") {
      updateLikedIds.push(currentUser.id);

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
              categoryId: likeNotificationId,
              postId: post.id,
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

      updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedIds: updateLikedIds,
          countLikes: post.countLikes + 1,
        },
      });
    } else {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        updateLikedIds = updateLikedIds.filter(
          (likedId) => likedId !== currentUser.id
        );

        await prisma.notification.deleteMany({
          where: {
            postId: postId,
            categoryId: likeNotificationId,
            actorId: currentUser.id,
          },
        });

        updatedPost = await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likedIds: updateLikedIds,
            countLikes: post.countLikes - 1,
          },
        });
      }
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).end();
  }
}
