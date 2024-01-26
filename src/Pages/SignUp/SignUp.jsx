import React, { useState } from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setUser(user)
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleSignIn = async () => {

        // signInWithPopup(auth, provider)
        signInWithRedirect(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log("TOKEN", token);
                console.log("USER", user);
            })

    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
            <p>
                {/* Already have an account? <Link to="/signin">Sign In</Link> */}
                Already have an account?
            </p>
        </div>
    );
};

export default SignUp;
