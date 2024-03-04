import { Collection } from "mongodb";
import { getClient } from "../../../config/database";
import { UserProps } from "../models/user_model";

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
}

export default UserRepository;
