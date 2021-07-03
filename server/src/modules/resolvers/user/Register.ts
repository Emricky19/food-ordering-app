import { Resolver, Mutation, Arg, Query } from "type-graphql";
import bcrypt from "bcrypt";

import { User } from "../../../entity/User";
import { RegisterInput } from "./register/registerInput";


@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Mutation(() => User)
  async register(
    @Arg("user") { username, email, password }: RegisterInput
  ): Promise<User> {
    const hash = await bcrypt.hash(password, 12);

    password = hash;
    const user = await User.create({
      username,
      email,
      password,
    });

    await user.save();
    return user;
  }
}
