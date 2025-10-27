// Authentication utilities

const SESSION_KEY = 'ticketapp_session';

export interface SessionData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Mock user database (for demo purposes)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@ticketapp.com',
    password: 'demo123',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
];

export const saveSession = (sessionData: SessionData): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = (): SessionData | null => {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;
  
  try {
    return JSON.parse(sessionStr);
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

// Mock login function
export const login = async (
  email: string,
  password: string
): Promise<SessionData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const sessionData: SessionData = {
    token: `mock_token_${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  saveSession(sessionData);
  return sessionData;
};

// Mock signup function
export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<SessionData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUser = MOCK_USERS.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Create new user
  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    password,
  };

  MOCK_USERS.push(newUser);

  const sessionData: SessionData = {
    token: `mock_token_${Date.now()}`,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };

  saveSession(sessionData);
  return sessionData;
};

export const logout = (): void => {
  clearSession();
};

