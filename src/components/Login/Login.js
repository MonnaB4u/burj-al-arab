import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Login.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



const Login = () => {

  const [loggedInUser,setloggedInUser]=useContext(UserContext)

  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
  }
  const history=useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  
    
    const handleGoogleSignIn=()=>{

      var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            const {displayName,email} = result.user;
           const signInUser={name: displayName,email}
             setloggedInUser(signInUser)
             history.replace(from)

            // ...

          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div>
           <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;