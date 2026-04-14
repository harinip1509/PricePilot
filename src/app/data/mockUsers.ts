/**
 * Mock User Data Storage
 *
 * This file simulates a database for storing registered user accounts.
 * In production, this would be replaced with actual database calls.
 */

export interface RegisteredUser {
  email: string;
  name: string;
  password: string;
  phone?: string;
  businessName?: string;
  industry?: string;
  currency?: string;
  timezone?: string;
  createdAt: string;
}

// Initial mock users - you can add default test accounts here
export const mockRegisteredUsers: RegisteredUser[] = [
  // Example: Uncomment to add a default test user
  // {
  //   email: "test@example.com",
  //   name: "Test User",
  //   password: "password123",
  //   createdAt: new Date().toISOString(),
  // },
];

/**
 * Helper functions for user management
 */

export const findUserByEmail = (email: string): RegisteredUser | undefined => {
  return mockRegisteredUsers.find((user) => user.email === email);
};

export const addUser = (user: RegisteredUser): void => {
  mockRegisteredUsers.push(user);
};

export const updateUser = (email: string, updates: Partial<RegisteredUser>): void => {
  const userIndex = mockRegisteredUsers.findIndex((user) => user.email === email);
  if (userIndex !== -1) {
    mockRegisteredUsers[userIndex] = {
      ...mockRegisteredUsers[userIndex],
      ...updates,
    };
  }
};

export const getAllUsers = (): RegisteredUser[] => {
  return mockRegisteredUsers;
};
