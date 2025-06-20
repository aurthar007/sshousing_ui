import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  user: null,  // should be an object like { name, email }
  role: null,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }), // e.g., { name: 'Avijit', email: 'a@a.com' }
  setRole: (role) => set({ role }),
  clearAuth: () => set({ token: null, user: null, role: null })
}));

export default useAuthStore;
