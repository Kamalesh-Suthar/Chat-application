interface userState {
    user: any;
    signIn: (user: any) => void;
    signOut: () => void;
}
declare const userStore: import("zustand").UseBoundStore<import("zustand").StoreApi<userState>>;
export default userStore;
