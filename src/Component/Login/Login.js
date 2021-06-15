import React, { useContext, useState } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import bgImage from '../Image/sky.jpeg';
import fbIcon from '../Image/icons8-facebook-48.png';
import glIcon from '../Image/icons8-google-48.png';
import ridersIcon from '../Image/icons8-public-transportation-50.png';

const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const backgroundStyle = {
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgImage})`,

    }

    const [signUpUser, setSignUpUser] = useState(false);
    const [user, setUser] = useState({
        signedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                // console.log(error);
                console.log(error.message);
            })
    }


    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const fbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then((res) => {
                const newUser = { ...user };
                newUser.error = '';
                setUser(newUser);
                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch(error => {
                const newUser = { ...user };
                newUser.error = error.message;
                setUser(newUser);
            });
    }


    const fieldBlur = (e) => {
        let fieldValid = true;
        if (e.target.name === 'email') {
            fieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passwordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            fieldValid = passwordValid && passwordNumber;
        }
        if (fieldValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser)
        }
    }
    const submitForm = (e) => {

        if (signUpUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password,)
                .then((res) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    setUser(newUser);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    setUser(newUser);
                });
        }

        if (!signUpUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    setUser(newUser);
                    setLoggedInUser(newUser)
                    history.replace(from);
                })
                .catch(error => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    setUser(newUser);
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({ displayName: name })
            .then((res) => {

            })
            .catch(error => {

            });
    }
    return (
        <div style={backgroundStyle} className="login-bg">
            <div className="form-box">
                <h3 className="form-title">
                    {!signUpUser ? "Log In" : 'Create Account'}
                </h3>
                <form onSubmit={submitForm} className="input-group">
                    {signUpUser && <input type="text" name="name" className="input-field" placeholder="Full NAme" onBlur={fieldBlur} />}
                    <br />
                    <input type="text" name="email" className="input-field" placeholder="Your Email Address" onBlur={fieldBlur} />
                    <br />
                    <input type="password" name="password" className="input-field" placeholder="Password" onBlur={fieldBlur} />
                    <br />
                    {signUpUser && <input type="text" name="confirmPassword" className="input-field" placeholder="Confirm Password" onBlur={fieldBlur} />}
                    <br />
                    <input type="submit" className="submit-btn" value={!signUpUser ? 'Login' : 'Sign Up'} />
                    <br />
                    <label className="label-text" htmlFor="signUpUser">{!signUpUser ? "Don't have an account?" : 'Already have an account?'}</label>
                    <Link className="toggle-link" onClick={() => setSignUpUser(!signUpUser)} > {!signUpUser ? 'Create new account' : 'Sign In'}</Link>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    <br />
                    <div className="social-icon">
                        <button className="icon" onClick={fbSignIn}><img src={fbIcon} alt="facebook" /></button>
                        <br />
                        <button className="icon" onClick={googleSignIn}><img src={glIcon} alt="google" /></button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default Login;