import './App.css'
import { useEffect, useState } from "react";
import { app } from "./firebase";
import Home from "./pages/Home.jsx"
import {
  createUserWithEmailAndPassword, //for sign up
  getAuth, //for authentication
  GoogleAuthProvider, //for Google authentication
  onAuthStateChanged, //for checking if user is logged in or not
  signInWithEmailAndPassword, //for logging in with email and password
  signInWithPopup, //for logging in with Google
  signOut, //for logging out
} from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>React with Firebase</h1>
      {user ? (
        <Home />
        // <div>
        //   <p>Signed in as {user.email ?? user.uid}</p>
        //   <button type="button" onClick={handleLogOut}>
        //     Sign out
        //   </button>
        // </div>
      ) : (
        <>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <button type="button" onClick={handleLogIn}>
            Log in
          </button>
          <br />
          <button type="button" onClick={handleSignUp}>
            Sign up
          </button>
          <br />
          <button type="button" onClick={handleGoogleLogIn}>
            Continue with Google
          </button>
        </>
      )}
    </div>
  )
  
}

export default App
