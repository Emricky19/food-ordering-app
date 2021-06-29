import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcrypt";

import { User } from "../../../entity/User";
import { RegisterInput } from "./register/registerInput";
import generateToken from "../../util/generateToken";
import { UserOutput } from "../../types/UserOutput";

@Resolver(User)
export class RegisterResolver {
  // ...
  @Mutation()
  async recipes(
    @Arg("user") { username, email, password }: RegisterInput
  ): Promise<UserOutput> {
    const hash = await bcrypt.hash(password, 12);

    password = hash;
    const user = await User.create({
      username,
      email,
      password,
    });

    await user.save();
    const token = generateToken(user);
    return {
      token,
      user,
    };
  }
}
