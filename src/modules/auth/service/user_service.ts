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
}

export default UserService;
