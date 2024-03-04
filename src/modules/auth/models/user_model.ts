// UserModel.ts
import ThrowError from '../../../middlewares/error';

export interface UserProps {
  username: string;
  email: string;
  password: string;
}

class UserModel implements UserProps {
  email: string;
  username: string;
  password: string;

  constructor(_props: UserProps) {
      this.username = _props.username;
      this.email = _props.email;
      this.password = _props.password;

      this.validateUser(); // Validate user on object creation
  }

  private validateName(): boolean {
      return this.username.trim().length > 0;
  }

  private validateEmail(): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
  }

  private validatePassword(): boolean {
      // Strong password requirements: at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])/;
      return this.password.length >= 8 && passwordRegex.test(this.password);
  }

  public validateUser(): void {
      const errors: string[] = [];

      if (!this.validateName()) {
          errors.push("Username must not be empty");
      }

      if (!this.validateEmail()) {
          errors.push("Invalid email format");
      }

      if (!this.validatePassword()) {
          errors.push("Weak password: Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
      }

      if (errors.length > 0) {
          throw new ThrowError(400, "Validation Error", JSON.stringify({ errors }));
      }
  }

  public validateEmpty(): void {
      const errors: string[] = [];

      if (!this.username) {
          errors.push("Username is required");
      }

      if (!this.email) {
          errors.push("Email is required");
      }

      if (!this.password) {
          errors.push("Password is required");
      }

      if (errors.length > 0) {
          throw new ThrowError(400, "Validation Error", JSON.stringify({ errors }));
      }
  }
}

export default UserModel;
