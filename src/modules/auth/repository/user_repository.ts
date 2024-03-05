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
      // Compare the provided password with the hashed password stored in the user object
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // If passwords don't match, return a 401 Unauthorized response
      }

      // Generate JWT token with user ID and email payload
      const token = jwt.sign(
        { userID: user._id, email: user.email },
        process.env.JWT_SECRET || '',
        { expiresIn: '1m' } // Set expiration time for 1 hour (adjust as needed)
      );
      
      // Return user object and token in the response
       res.status(200).json({ user, token });
    } catch (error) {
      // Log and handle any errors that occur during login
      console.error("Error while verifying user by login:", error);
       res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserRepository;
