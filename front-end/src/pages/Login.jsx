import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [loginBtn, setLoginBtn] = useState(true);
  const [isUserValid, setIsUserValid] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitLogin = async () => {
    try {
      await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      setIsUserValid(true);
      navigate('/customer/products');
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
        setIsUserValid(false);
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

  useEffect(() => {
    setLoginBtn(!isEmailValid(email) || !isPwValid(password));
  }, [email, password, invalidEmail, isUserValid]);

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
      >
        Register

      </button>

      {!isUserValid
        && <p data-testid="common_login__element-invalid-email">{ message }</p>}
    </div>
  );
}

export default Login;
