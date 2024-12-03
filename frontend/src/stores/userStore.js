import { create } from 'zustand';
const userStore = create((set) => ({
    user: null,
    signIn: (user) => set({ user }),
    signOut: () => set({ user: null }),
}));
export default userStore;
