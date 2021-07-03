import { Field, ObjectType } from "type-graphql"

import { User } from "../../../../entity/User"

@ObjectType()
export class AuthResponse extends User {
    @Field()
    accessToken: string;
}