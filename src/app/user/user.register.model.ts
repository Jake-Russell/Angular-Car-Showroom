import { User } from './user.model';

export interface UserRegister {
  success: boolean;
  message: string;
  user?: User;
}
