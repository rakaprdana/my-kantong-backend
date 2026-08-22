import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/user";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export class AuthService {
  static register = async (data: IUser) => {
    const { username, password } = data;
    const userIsExist = await User.findOne({ username });
    if (userIsExist) return { error: "USER_EXIST", userIsExist };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!newUser) return { error: "CREATE_FAILED" };

    return {
      _id: newUser.id,
      username: newUser.username,
      token: generateToken(newUser.id),
    };
  };

  static login = async (data: IUser) => {
    const { username, password } = data;
    const user = await User.findOne({ username });

    if (!user || !user.password) return { error: "INVALID_LOGIN" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "INVALID_PASSWORD" };

    return {
      _id: user.id,
      username: user.username,
      token: generateToken(user.id),
    };
  };
}
