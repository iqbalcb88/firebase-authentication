import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
  const auth = getAuth();
  const googleSignInHandle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const googleLoggedInUser = result.user;
      console.log(googleLoggedInUser);
    });
  };
  const gitHubSignInHandle = () => {
    signInWithPopup(auth, gitHubProvider).then((result) => {
      const gitHubLoggedInUser = result.user;
      console.log(gitHubLoggedInUser);
    });
  };
  //Register Btn Functionality
  // set state for email change
  const [email, setEmail] = useState('');
  // set state for password change
  const [password, setPassword] = useState('');
  // Handle email input
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  // Handle password input
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  // handle register by password firebase
  const loggedInWithPassword = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const registerUserLogIn = result.user;
      console.log(registerUserLogIn);
    });
    // console.log('working handle');
  };
  return (
    <div>
      <div className='d-grid my-5 gap-2 col-6 mx-auto'>
        <button
          onClick={googleSignInHandle}
          className='btn btn-primary'
          type='button'
        >
          GoogleSignIn
        </button>
        <button
          onClick={gitHubSignInHandle}
          className='btn btn-primary'
          type='button'
        >
          GitHubSignIn
        </button>
      </div>
      <div className='mx-5'>
        <form onSubmit={loggedInWithPassword}>
          <div className='row mb-3'>
            <label htmlFor='inputEmail3' className='col-sm-2 col-form-label'>
              Email
            </label>
            <div className='col-sm-10'>
              <input
                onBlur={handleEmail}
                type='email'
                className='form-control'
                id='inputEmail3'
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label htmlFor='inputPassword3' className='col-sm-2 col-form-label'>
              Password
            </label>
            <div className='col-sm-10'>
              <input
                onBlur={handlePassword}
                type='password'
                className='form-control'
                id='inputPassword3'
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-sm-10 offset-sm-2'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='gridCheck1'
                />
                <label className='form-check-label' htmlFor='gridCheck1'>
                  Example checkbox
                </label>
              </div>
              <button type='submit' className='btn btn-primary'>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
