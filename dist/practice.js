"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["Moderator"] = "MODERATOR";
    UserRole["User"] = "USER";
})(UserRole || (UserRole = {}));
const users = [
    { id: 1, username: 'admin', role: UserRole.Admin },
    { id: 2, username: 'moderator', role: UserRole.Moderator },
    { id: 3, username: 'user1', role: UserRole.User },
];
// Function to check if a user has admin privileges
function isAdmin(user) {
    return user.role === UserRole.Admin;
}
// Function to display user role
function displayUserRole(user) {
    console.log(`${user.username}'s role is ${user.role}`);
}
// Example usage
const currentUser = users[0];
console.log(isAdmin(currentUser)); // Output: true
displayUserRole(currentUser); // Output: admin's role is ADMIN
