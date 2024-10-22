import { type Author, type AuthorId } from "./authors";

export type PostId = number;

export type PostWithAuthor = {
   id: PostId;
   title: string;
   body: string;
   authorId: AuthorId;
   userId: number;
   created_at: string;
   updated_at: string;
   author: Author;
};

export type RawPost = {
   title: string;
   author: AuthorId;
   content: string;
};
