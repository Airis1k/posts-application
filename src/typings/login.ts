export type Credentials = {
   email: string;
   password: string;
};

export type User = {
   id: number;
   email: string;
   name: string;
};

export type UserCredentials = {
   accessToken: string;
   user: User;
};
