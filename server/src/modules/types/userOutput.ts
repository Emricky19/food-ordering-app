import { User } from "../../entity/User";

export interface UserOutput {
  token: string;
  user: User;
}
