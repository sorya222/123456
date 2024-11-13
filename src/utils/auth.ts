interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export const login = (email: string, password: string): User | null => {
  // Demo authentication logic
  if (email === 'student@example.com' && password === 'demo123') {
    return {
      id: '1',
      email: 'student@example.com',
      name: 'Demo Student',
      role: 'student'
    };
  }
  if (email === 'admin@example.com' && password === 'demo123') {
    return {
      id: '2',
      email: 'admin@example.com',
      name: 'Demo Admin',
      role: 'admin'
    };
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};