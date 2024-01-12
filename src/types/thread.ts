import { Channel } from "./channel";
import { User } from "./user";

export interface Like {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
}

export interface LikeByNotification extends Omit<Like, "post"> {
  post: Thread;
}

export interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string;
  createdAt: string;
  updatedAt: string;
}

export interface Thread {
  likes: Like[];
  comments: Comment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  content: string;
  mentionedList: string;
  channel: Channel;
  author: User;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}
