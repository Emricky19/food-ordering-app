import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../util/validator.js";
import generateToken from "../util/generateToken.js";

const userResolvers = {
  Mutation: {
    registerUser: async (_, args) => {
      let {
        registerInput: { username, email, password },
      } = args;

      const { errors, valid: isValid } = validateRegisterInput(
        username,
        email,
        password
      );

      if (!isValid) throw new UserInputError("Errors", errors);

      const userAlreadyExist = await User.findOne({ username });

      if (userAlreadyExist) {
        throw new UserInputError("Username is Already Taken", {
          errors: {
            username: "Username is already taken",
          },
        });
      }

      const cipherPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password: cipherPassword,
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    loginUser: async (_, args) => {
      const { username, password } = args;

      const { errors, valid: isValid } = validateLoginInput(username, password);

      if (!isValid) throw new UserInputError("Invalid inputs", errors);

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User does not exist";
        throw new UserInputError("User does not exist", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Username or password incorrect";
        throw new UserInputError("Username or password Incorrect", { errors });
      }
      const token = generateToken(user);
      return {
        token,
        ...user._doc,
        id: user._id,
      };
    },
  },
};

export default userResolvers;
