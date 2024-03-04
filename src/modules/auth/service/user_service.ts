import { Response } from "express";
import UserModel, { UserProps } from "../models/user_model";
import UserRepository from "../repository/user_repository";

class UserService {
  static async registerUser(newUser: UserProps): Promise<void> {
    try {
      const user = new UserModel(newUser);
      user.validateUser(); // Validate user
      
      // Validate empty fields
      user.validateEmpty();
      
      // Check if email already exists
      const existingUser = await UserRepository.findEmail(user.email);
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      await UserRepository.registerUser(user);
    } catch (error: any) {
      if (error instanceof Error) {
        throw  error; // Re-throw the error directly
      } else {
        throw error; // Throw the error directly
      }
    }
  }


  static async loginUser(email: string, password: string, res: Response): Promise<void> {
    try {
      if (!email || !password) {
        res.status(400).json({ statusMessage:"FAILURE",error: 'Email and password are required' });
        return;
      }
      
      const existingUser = await UserRepository.findEmail(email);
      
      if (!existingUser) {
        res.status(404).json({statusMessage:"FAILURE",error: "User not found. Please enter a registered email!" });
        return;
      }

      await UserRepository.verifyUserByLogin(existingUser, password, res);
    } catch (error) {
      console.error("Error while logging in the user:", error);
    }
  }



}

export default UserService;
