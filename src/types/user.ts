import { Follow, Message } from "./notification";
import { Like, Thread } from "./thread";

export interface User {
  coverImage: string;
  image: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: Thread[];
  likes: Like[];
  comments: string[];
  followers: [];
  following: Follow[];
  notifications: Notification[];
  messages: Message[];
  _id: string;
  fullName: string;
  nickname: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
