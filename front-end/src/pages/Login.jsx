import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [loginBtn, setLoginBtn] = useState(true);
  const [isUserValid, setIsUserValid] = useState(false);
  const [message, setMessage] = useState('');

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      setIsUserValid(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsUserValid(false);
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

  useEffect(() => {
    setLoginBtn(!isEmailValid(email) || !isPwValid(password));
  }, [email, password, invalidEmail]);

  return (
    <div>
      <label htmlFor="loginEmail">
        <input
          type="email"
          data-testid="common_login__input-email"
          id="loginEmail"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="loginPw">
        <input
          type="password"
          data-testid="common_login__input-password"
          id="loginPw"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ loginBtn }
        onClick={ (e) => submitLogin(e) }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Register

      </button>

      {!isUserValid
      && <p data-testid="common_login__element-invalid-email">{ message }</p>}
    </div>
  );
}

export default Login;
