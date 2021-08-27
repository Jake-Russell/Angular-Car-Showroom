export interface User {
  _id: string;
  forename: string;
  surname: string;
  username: string;
  password: string;
  token?: string;
  admin?: boolean;
}
