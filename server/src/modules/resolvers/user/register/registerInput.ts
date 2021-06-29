import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
