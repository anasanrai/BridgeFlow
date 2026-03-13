export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}

export interface UserProfile extends User {
  createdAt: string;
  updatedAt: string;
}
