import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [loginBtn, setLoginBtn] = useState(true);
  const [isUserValid, setIsUserValid] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const submitLogin = async () => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      setIsUserValid(true);
      history.push('/customer/products');
      console.log(response.data);
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
        setIsUserValid(false);
        console.log(error.response);
      }
    }
  };

  const isEmailValid = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || regex.test(value)) {
      setInvalidEmail(true);

      return true;
    }
    setInvalidEmail(false);
    return false;
  };

  const isPwValid = (value) => {
    const minLength = 6;
    return value.length >= minLength;
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setLoginBtn(!isEmailValid(email) || !isPwValid(password));
  }, [email, password, invalidEmail, isUserValid]);

  return (
    <div>
      <label htmlFor="loginEmail">
        <input
          placeholder="Email"
          type="email"
          data-testid="common_login__input-email"
          id="loginEmail"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="loginPw">
        <input
          placeholder="Password"
          type="password"
          data-testid="common_login__input-password"
          id="loginPw"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
        type="submit"
        data-testid="common_login__button-login"
        disabled={ loginBtn }
        onClick={ () => submitLogin() }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Register
      </button>

      {!isUserValid
        && <p data-testid="common_login__element-invalid-email">{message}</p>}
    </div>
  );
}

export default Login;
