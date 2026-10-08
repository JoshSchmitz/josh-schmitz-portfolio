/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// import state
import { useLoginMutation } from '../../../store/slices/auth/api-auth';
import { setCredentials, handleOpen } from '../../../store/slices/auth/auth';

//import components
import PulseLoader from 'react-spinners/PulseLoader';

const Login = ({ registerClick }) => {
  const { isOpen } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      dispatch(handleOpen(!isOpen));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-header'>
          <div className='title-bar'>
            <h1 className='title'>Sign In</h1>
          </div>
          <h4 className='subtitle'>
            Sign in to your account using your email address
          </h4>
        </div>
        <div className='form-group'>
          <input
            id='loginemail'
            className='input'
            type='email'
            placeholder='Email address'
            autoComplete='on'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id='loginpassword'
            className='input'
            type='password'
            placeholder='Password'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='button' type='submit'>
          {isLoading ? (
            <PulseLoader
              className='loader-button'
              loading={isLoading}
              size={10}
              color='#f4f4f4'
            />
          ) : (
            'Login'
          )}
        </button>
      </form>
      <div className='form-extra'>
        Need an account?{' '}
        <a className='link' onClick={registerClick}>
          Register
        </a>
      </div>
    </>
  );
};
Login.propTypes = {
  registerClick: PropTypes.func,
};

export default Login;
