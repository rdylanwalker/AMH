import { AuthContextState } from '../AuthProvider';

const makeMockAuthState = (from?: Partial<AuthContextState>): AuthContextState => ({
  currentUser: null,
  signIn: jest.fn().mockResolvedValue(true),
  signOut: jest.fn().mockResolvedValue(true),
  ...from,
});

export default makeMockAuthState;
