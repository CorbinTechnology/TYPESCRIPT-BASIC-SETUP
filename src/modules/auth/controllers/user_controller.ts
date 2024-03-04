// import { Collection } from "mongodb";
// import { Request, Response } from 'express';
// import bcrypt from "bcrypt";
// import { getClient } from "../../../config/database";
// // const jsonwebToken=require("jsonwebtoken");
// import jwt from  "jsonwebtoken";
// import UserModel, {UserProps} from "../models/user_model";



// //client object main part database se connnection ke liye

// export async function getUserCollection(): Promise<Collection<UserProps>> {
//     const client = getClient();
//     const db = client.db("harsha");
//     return db.collection<UserProps>('users');
// }


// export async function registerUser(req: Request, res: Response): Promise<any> {
//     try {
//         const newUser: UserProps = req.body;

//         //services
//         const user = new UserModel(newUser);

//         // Validate user
//         const validationResult = user.validateUser();
//         if (!validationResult.valid) {
//             return res.status(400).json({ errors: validationResult.errors });
//         }
//         console.log('Received user data:', user);

//         // Validate empty fields
//         const emptyValidationResult = user.validateEmpty();
//         if (!emptyValidationResult.valid) {
//             return res.status(400).json({ errors: emptyValidationResult.errors });
//         }

//         //repository
//         const userCollection = await getUserCollection();

//         const existingUser = await userCollection.findOne({ email: user.email });

//         //repository validation



//         if (existingUser) {
//             const errorMessage = 'Validation failed: Email already exists';
//             console.error(errorMessage);
//             return res.status(400).json({ error: errorMessage });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(user.password, saltRounds);

//         const userWithHashedPassword: UserProps = {
//             ...user,
//             password: hashedPassword,
//         };

//         const result = await userCollection.insertOne(userWithHashedPassword);
//         if (result.acknowledged) {
//             res.status(200).json(user);
//             res.json({message:"SUCCESS",info:})
//             return user; 
//         } else {
//             const errorMessage = 'User registration failed';
//             console.error(errorMessage);
//             return res.status(500).json({ error: errorMessage });
//         }
//     } catch (error) {
//         console.error('Error registering user:', error);
//         return res.status(500).json({ error: 'An unexpected error occurred' });
//     }
// }



// export async function loginUser(req: Request, res: Response): Promise<void> {
//     try {
//         const { email, password } = req.body;

//         // Validate input
//         if (!email || !password) {
//             res.status(400).json({ error: 'Email and password are required' });
//             return;
//         }

//         // Retrieve user from database
//         const userCollection = await getUserCollection();
//         const user = await userCollection.findOne({ email });

//         // Check if user exists
//         if (!user) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }

//         // Verify password
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             res.status(401).json({ error: 'Invalid password' });
//             return;
//         }

//         // Generate authentication token (JWT)
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');

//         // Return success response with token
//         res.status(200).json({ user, token });
//     } catch (error) {
//         console.error('Login failed:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }