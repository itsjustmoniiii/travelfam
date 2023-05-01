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
    if (!currentUser.id || typeof currentUser.id !== "string") {
      throw new Error("Invalid ID");
    }
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id,
        createdAt: {
          gte: tenDaysAgo,
        },
      },
      include: {
        actor: true,
        category: true,
        post: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(400).end();
  }
}
