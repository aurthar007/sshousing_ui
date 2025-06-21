import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  user: null,  
  role: null,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }), 
  setRole: (role) => set({ role }),
  clearAuth: () => set({ token: null, user: null, role: null })
}));

export default useAuthStore;
