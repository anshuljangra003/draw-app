import {z} from "zod";

export const UserSchema=z.object({
    username:z.string().min(2).max(20),
    password:z.string().min(5).max(20),
    name:z.string().max(20)
})

export const SigninSchema=z.object({
    username:z.string().min(2).max(20),
    password:z.string().min(5).max(20)
})

export const RoomSchema=z.object({
    roomId:z.string(),
})