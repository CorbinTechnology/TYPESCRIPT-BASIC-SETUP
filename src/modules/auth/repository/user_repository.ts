import { Collection } from "mongodb";
import { getClient } from "../../../config/database";
import { UserProps } from "../models/user_model";
import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class UserRepository {

  static async getUserCollection(): Promise<Collection<UserProps>> {
    const client = getClient();
    const db = client.db("master");
    return db.collection<UserProps>('users');
  }
  
  static async findEmail(email: string): Promise<UserProps | null> {
    const userCollection: Collection<UserProps> = await UserRepository.getUserCollection();
    return await userCollection.findOne({ email });
  }

  static async registerUser(user: UserProps): Promise<void> {
    const userCollection: Collection<UserProps> = await UserRepository.getUserCollection();
    await userCollection.insertOne(user);
  }


  //Login user 
  static async verifyUserByLogin(user: UserProps, password: string, res: Response): Promise<void> {
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      const token = jwt.sign({ userId: user._id,email:user.email }, process.env.JWT_SECRET || '');
      res.status(200).json({ user, token });
    } catch (error) {
      console.error("Error while verifying user by login:", error);
    }
  }
}

export default UserRepository;
