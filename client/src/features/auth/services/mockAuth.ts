export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  username?: string;
}

const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
  },
];

const simulateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 300));

function generateToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const mockAuth = {
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
    await simulateDelay();

    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase(),
    );

    if (!user) {
      throw new Error('No account found with this email address.');
    }

    if (user.password !== credentials.password) {
      throw new Error('Incorrect password. Please try again.');
    }

    const { password: _, ...authUser } = user;
    return { user: authUser, token: generateToken() };
  },

  async register(
    credentials: RegisterCredentials,
  ): Promise<{ user: AuthUser; token: string }> {
    await simulateDelay();

    const exists = MOCK_USERS.some(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase(),
    );

    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: AuthUser & { password: string } = {
      id: generateId(),
      name: credentials.name,
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
    };

    MOCK_USERS.push(newUser);

    const { password: _, ...authUser } = newUser;
    return { user: authUser, token: generateToken() };
  },

  async logout(): Promise<void> {
    await simulateDelay();
  },

  async getCurrentUser(token: string): Promise<AuthUser | null> {
    await simulateDelay();

    if (!token.startsWith('mock-token')) return null;

    return MOCK_USERS[0]
      ? { id: MOCK_USERS[0].id, name: MOCK_USERS[0].name, email: MOCK_USERS[0].email, avatar: MOCK_USERS[0].avatar }
      : null;
  },
};
