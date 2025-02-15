import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { RoomSchema, SigninSchema, UserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  const parseddata = UserSchema.safeParse(req.body);
  if (!parseddata.success) {
    console.log(parseddata.error);
    res.status(403).json({
      err: "invalid input",
    });
    return;
  }

  const user = await prismaClient.user.create({
    data: {
      email: parseddata.data.username,
      password: parseddata.data.password,
      name: parseddata.data.name,
    },
  });
  res.json({
    userId: user.id,
  });
});
app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      err: "invalid input",
    });
    return;
  }
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.username,
        password: parsedData.data.password,
      },
    });
    if (!user) {
      res.status(411).json({
        message: "user does not exist",
      });
    }

    const userId = user?.id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/room-id", middleware, async (req, res) => {
  const parsedData = RoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData)
    console.log(parsedData.error);
    res.status(403).json({
      err: "invalid input",
    });
    return;
  }

  try {
    // @ts-ignore
    const userId = req.userId;

    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.roomId,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.get("/chat/:roomId", async (req, res) => {
  const roomId = parseInt(req.params.roomId);

  const chats = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 20,
  });

  res.json({
    chats
  });
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const Room = await prismaClient.room.findFirst({
    where: {
      slug: slug,
    },
  });

  res.json({
    Room,
  });
});

app.listen(3001);
