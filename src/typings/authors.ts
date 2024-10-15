export type AuthorId = number;

export type Author = {
   id: AuthorId;
   name: string;
   surname: string;
   userId: number;
   created_at: string;
   updated_at: string;
   latest_date?: string;
};

export type RawAuthor = {
   name: string;
   surname: string;
};
