import { create } from 'zustand'

interface userState {
    user: any,
    signIn: (user: any) => void,
    signOut: () => void,
}

const userStore = create<userState>((set) => ({
    user: null,
    signIn: (user) => set({ user }),
    signOut: () => set({ user: null }),
}))

export default userStore