export interface Channel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: "compliment" | "cheering" | "incompetent";
  description: string;
  createdAt: string;
  updatedAt: string;
}
