import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

interface UserState {
  user: any;
  signIn: (user: any) => void;
  signOut: () => void;
}

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key";

const encryptData = (data: any) => {
  console.log(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const userStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      signIn: (user) => {
        const encryptedUser = encryptData(user);
        localStorage.setItem("user", encryptedUser);
        set({ user });
      },
      signOut: () => {
        localStorage.removeItem("user");
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name: string) => {
          const str = localStorage.getItem(name);
          return str ? decryptData(str) : null;
        },
        setItem: (name: string, value: any): void => {
          localStorage.setItem(name, encryptData(value));
        },
        removeItem: (name: string): void => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default userStore;
