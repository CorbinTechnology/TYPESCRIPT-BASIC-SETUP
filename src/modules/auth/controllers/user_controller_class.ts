import { Request, Response } from 'express';
import UserService from '../service/user_service';

class UserController {
  static async registerUserController(req: Request, res: Response): Promise<void> {
    try {
      const newUser = req.body;
      const result = await UserService.registerUser(newUser);
      res.status(200).json({ message: "SUCCESS", info: "User Registered Successfully!!!" });
    } catch (error:any) {
      console.error('Error registering user:', error);
      res.status(error.code || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }




  static async loginUserController(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      await UserService.loginUser(email, password, res);
    } catch (error: any) {
      res.status(error.code || 500).json({ error: error.message || 'An unexpected error occurred' });
      console.error("Error while login the user!!!");
    }
  }


}

export default UserController;
