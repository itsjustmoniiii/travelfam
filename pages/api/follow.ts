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
    //userid of person i want to follow
    const { userId } = req.body;
    const followNotificationId = "644e97122f37231489308761";
    //my user
    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    //find the user that i want to follow
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updateFollowingIds = [...(currentUser?.followingIds || [])];

    let updatedUser;
    if (req.method == "POST") {
      updateFollowingIds.push(userId);
      updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followingIds: updateFollowingIds,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          countFollowers: user.countFollowers + 1,
        },
      });

      try {
        await prisma.notification.create({
          data: {
            actorId: currentUser.id,
            userId: userId,
            categoryId: followNotificationId,
          },
        });
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      updateFollowingIds = updateFollowingIds.filter(
        (followingId) => followingId !== userId
      );
      await prisma.notification.deleteMany({
        where: {
          categoryId: followNotificationId,
          userId: userId,
          actorId: currentUser.id,
        },
      });
      updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followingIds: updateFollowingIds,
        },
      });
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          countFollowers: user.countFollowers - 1,
        },
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
}
