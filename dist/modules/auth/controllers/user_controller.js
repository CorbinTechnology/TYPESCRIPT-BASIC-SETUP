"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getUserCollection = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../../../config/database");
function getUserCollection() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, database_1.getClient)();
        const db = client.db("master");
        return db.collection('users');
    });
}
exports.getUserCollection = getUserCollection;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        console.log('Received user data:', user);
        const userCollection = yield getUserCollection();
        if (!user.username || !user.email || !user.password) {
            const errorMessage = 'Validation failed: Username, email, and password are required';
            console.error(errorMessage);
            res.status(400).json({ error: errorMessage });
            throw new Error(errorMessage); // Throw an error to indicate failure
        }
        const existingUser = yield userCollection.findOne({ email: user.email });
        if (existingUser) {
            const errorMessage = 'Validation failed: Email already exists';
            console.error(errorMessage);
            res.status(400).json({ error: errorMessage });
            throw new Error(errorMessage); // Throw an error to indicate failure
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            const errorMessage = 'Validation failed: Invalid email format';
            console.error(errorMessage);
            res.status(400).json({ error: errorMessage });
            throw new Error(errorMessage); // Throw an error to indicate failure
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(user.password)) {
            const errorMessage = 'Validation failed: Invalid password format. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit';
            console.error(errorMessage);
            res.status(400).json({ error: errorMessage });
            throw new Error(errorMessage); // Throw an error to indicate failure
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
        const userWithHashedPassword = Object.assign(Object.assign({}, user), { password: hashedPassword });
        const result = yield userCollection.insertOne(userWithHashedPassword);
        if (result.acknowledged) {
            res.status(201).json(user);
            return user; // Return the registered user
        }
        else {
            const errorMessage = 'User registration failed';
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage });
            throw new Error(errorMessage); // Throw an error to indicate failure
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email && !password) {
            console.log("All Fields are required");
        }
        const comparePassword = ;
    });
}
exports.loginUser = loginUser;
