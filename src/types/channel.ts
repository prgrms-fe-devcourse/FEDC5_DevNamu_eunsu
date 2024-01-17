export interface Channel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: "compliment" | "cheering" | "incompetent" | "improvements" | "chat";
  description: string;
  createdAt: string;
  updatedAt: string;
}
