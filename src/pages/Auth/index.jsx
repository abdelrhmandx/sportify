import { useState } from "react";
import * as Components from "../../components/Auth/Components";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Logo from "../../imgs/logo2 .png";

import { fireApp } from "../../app/config/firebase";




export const Auth = () => {
  const auth = getAuth(fireApp);
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationDenied, setRegistrationDenied] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (email.endsWith("@admin.com")) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User signed up:", user);
        setRegistrationDenied(false);
        setError(null);
      } else {
        setError("Error signing up: Email must end with @admin.com");
        setRegistrationDenied(true);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(`Error signing up: ${error.message}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setError(false)
     
      navigate("/dashboard");
       
    } catch (error) {
   
      setError("Error Signing in: Wrong Cred");
     
    }
  };

  return (
    <>
      <img className={styles.topLeftImage} src={Logo} alt="Logo" />
      <div className={styles.loginPage}>
        <Components.Container>
          {signIn ? (
            <Components.SignInContainer signinin={signIn}>
              <Components.Form>
                <Components.Title>Sign In</Components.Title>
                <Components.Input
                  type="email"
                  placeholder="Email or Mobile Number"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Components.Anchor href="#">
                  <h4>Forgot your password?</h4>
                </Components.Anchor>
                {error && <div className={styles.errorMsg}>{error}</div>}
                <Components.Button onClick={handleSignIn}>
                  Sign In
                </Components.Button>
              </Components.Form>
            </Components.SignInContainer>
          ) : (
            <Components.SignUpContainer signinin={signIn}>
              <Components.Form>
                <Components.Title>Create Account</Components.Title>
                <Components.Input type="text" placeholder="First Name" />
                <Components.Input type="text" placeholder="Last Name" />
                <Components.Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {registrationDenied &&
                  email &&
                  !email.endsWith("@admin.com") && (
                    <div className={styles.errorMsg}>
                      You do not have the right to register.
                    </div>
                  )}
                <Components.Input type="number" placeholder="Mobile Number" />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Components.Input
                  type="password"
                  placeholder="Confirm Password"
                />
                {error && <div className={styles.errorMsg}>{error}</div>}
                <Components.Button onClick={handleSignUp}>
                  Sign Up
                </Components.Button>
              </Components.Form>
            </Components.SignUpContainer>
          )}

          <Components.OverlayContainer signinin={signIn}>
            <Components.Overlay signinin={signIn}>
              <Components.LeftOverlayPanel signinin={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                 
                    To keep connected with us please login with your personal
                    info
                  
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinin={signIn}>
                <Components.Title>Hello, Sir!</Components.Title>
                <Components.Paragraph>
                 
                    Enter Your personal details and start the journey with us
                  
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </>
  );
};
