declare const firebaseApp: import("@firebase/app").FirebaseApp;
export default firebaseApp;
declare const auth: import("@firebase/auth").Auth;
declare const signInWithGoogle: () => Promise<import("@firebase/auth").UserCredential>;
export { auth, signInWithGoogle };
