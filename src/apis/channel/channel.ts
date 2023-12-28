import api from "@/apis/core";

interface Channel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getChannels = () => api.get<Channel[]>({ url: `/channels` });
