import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server";
import { validateRegisterInput } from "../../util/validator.js";
import generateToken from "../../util/generateToken.js";

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
        throw new AuthenticationError("Username is Already Taken", {
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
        token
      };
    },
  },
};

export default userResolvers;
