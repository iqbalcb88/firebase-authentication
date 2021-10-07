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
  // set state for password field error related
  const [error, setError] = useState('');
  // set state for login field success related
  const [success, setSuccess] = useState('');
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
    if (password.length < 6) {
      setError('Password must be at least Six characters long');
      return;
    }
    if (!/^(?=.*\d)/.test(password)) {
      setError('Password must contain a number');
      return;
    }
    if (!/^(?=.*[a-z])/.test(password)) {
      setError('Password must contain a small letter');
      return;
    }
    if (!/^(?=.*[A-Z])/.test(password)) {
      setError('Password must contain a capital letter');
      return;
    }
    if (!/^(?=.*[!#$%&? "])/.test(password)) {
      setError('Password must contain a special character');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const registerUserLogIn = result.user;
        console.log(registerUserLogIn);
        setError('');
        setSuccess('Login Success');
        document.getElementById('inputPassword3').value = '';
        document.getElementById('inputEmail3').value = '';
      })
      .catch((error) => {
        setError(error.message);
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
                required
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
                required
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
              <div className='text-danger'>{error}</div>
              <div className='text-success'>{success}</div>
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
