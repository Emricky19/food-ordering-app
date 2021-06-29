import jwt from "jsonwebtoken";
import { User } from "../../entity/User";

const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.TOKEN_SECRET!,
    { expiresIn: "1h" }
  );
};

export default generateToken;
