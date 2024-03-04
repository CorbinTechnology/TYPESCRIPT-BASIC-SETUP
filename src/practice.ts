enum UserRole {
    Admin = 'ADMIN',
    Moderator = 'MODERATOR',
    User = 'USER',
  }

  
interface User {
    id: number;
    username: string;
    role: UserRole; // Using enum to represent user roles
  }
  
  const users: User[] = [
    { id: 1, username: 'admin', role: UserRole.Admin },
    { id: 2, username: 'moderator', role: UserRole.Moderator },
    { id: 3, username: 'user1', role: UserRole.User },
  ];
  
  // Function to check if a user has admin privileges
  function isAdmin(user: User): boolean {
    return user.role === UserRole.Admin;
  }
  
  // Function to display user role
  function displayUserRole(user: User): void {
    console.log(`${user.username}'s role is ${user.role}`);
  }
  
  // Example usage
  const currentUser: User = users[0];
  console.log(isAdmin(currentUser)); // Output: true
  displayUserRole(currentUser);       // Output: admin's role is ADMIN
  