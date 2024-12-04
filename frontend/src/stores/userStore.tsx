import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { User, UserState } from "@/types/user";

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key";

const encryptData = (data: unknown) => {
  if (typeof data === "object" && data !== null && "state" in data) {
    return CryptoJS.AES.encrypt(
      JSON.stringify((data as { state: { user: User | null } }).state.user),
      encryptionKey
    ).toString();
  }
  return "";
};

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as User | null;
};

const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user: User) => set({ user }), // Add proper type
      signOut: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item
            ? { state: { user: decryptData(item) }, version: 0 }
            : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, encryptData(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default userStore;