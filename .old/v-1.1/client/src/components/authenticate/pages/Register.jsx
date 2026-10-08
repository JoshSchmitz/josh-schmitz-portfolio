/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// import state
import { setCredentials, handleOpen } from '../../../store/slices/auth/auth';
import { useRegisterMutation } from '../../../store/slices/auth/api-auth';

// import components
import PulseLoader from 'react-spinners/PulseLoader';

const Register = ({ loginClick }) => {
  const { isOpen } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        loginClick();
        dispatch(handleOpen(!isOpen));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <form className='form' autoComplete='on' onSubmit={registerHandler}>
        <div className='form-header'>
          <div className='title-bar'>
            <h1 className='title'>Sign up</h1>
          </div>
          <h4 className='subtitle'>Sign up for access to cool stuff</h4>
        </div>
        <div className='form-group'>
          <input
            id='registername'
            className='input'
            type='text'
            placeholder='Name'
            autoComplete='on'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id='registeremail'
            className='input'
            type='email'
            placeholder='Email address'
            autoComplete='on'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id='registerpassword'
            className='input'
            type='password'
            placeholder='Password'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            id='registerconfirmpassword'
            className='input'
            type='password'
            placeholder='Confirm password'
            autoComplete='off'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            'Register'
          )}
        </button>
      </form>
      <div className='form-extra'>
        Already have an account?{' '}
        <a className='link' onClick={loginClick}>
          Log in
        </a>
      </div>
    </>
  );
};
Register.propTypes = {
  loginClick: PropTypes.func,
};
export default Register;
