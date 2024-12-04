// User related type definitions
interface User {
  email: string;
  displayName: string;
  // createdAt: Date;
  // updatedAt: Date;
  // isActive: boolean;
}

interface UserState {
  user: User | null; // Replace any with User | null
  signIn: (user: User) => void; // Replace any with User
  signOut: () => void;
}

// interface UserProfile extends Omit<User, 'createdAt' | 'updatedAt'> {
//   avatar?: string;
//   phoneNumber?: string;
//   address?: string;
//   preferences: {
//     theme: 'light' | 'dark';
//     notifications: boolean;
//   };
// }

// type UserActions = {
//   signIn: (credentials: UserCredentials) => Promise<void>;
//   signOut: () => void;
//   updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
// };

// Export all types
export type {
  User,
  // UserCredentials,
  // UserProfile,
  UserState,
  // UserActions
};
