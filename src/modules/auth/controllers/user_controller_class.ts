import { Request, Response } from 'express';
import UserService from '../service/user_service';

class UserController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = req.body;
      const result = await UserService.registerUser(newUser);
      res.status(200).json({ message: "SUCCESS", info: "User Registered Successfully!!!" });
    } catch (error:any) {
      console.error('Error registering user:', error);
      res.status(error.code || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }
}

export default UserController;
