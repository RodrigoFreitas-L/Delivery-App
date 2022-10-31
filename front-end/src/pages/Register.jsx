import React, { useEffect, useState } from 'react';

function Register() {
  const [isUserValid, setIsUserValid] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(true);
  const [message, setMessage] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submitRegister = async () => {
    try {
      const response = await api.post('/register', {
        email,
        password,
      });
      setIsUserValid(true);
      // history.push('/customer/products');
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

  const isNameValid = (value) => {
    const minLength = 12;
    return value.length >= minLength;
  };

  useEffect(() => {
    setRegisterBtn(!isEmailValid(email) || !isPwValid(password) || !isNameValid(name));
  }, [email, password, invalidEmail, isUserValid, isNameValid, name]);

  return (
    <div>
      <label htmlFor="input-name">
        <input
          placeholder="Name"
          type="text"
          id="input-name"
          data-testid="common_register__input-name"
          value={ name }
          onChange={ ({ target: { value } }) => setName(value) }
        />
      </label>
      <label htmlFor="input-email">
        <input
          placeholder="Email"
          type="email"
          id="input-email"
          data-testid="common_register__input-email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="input-password">
        <input
          placeholder="Password"
          type="password"
          id="input-password"
          data-testid="common_register__input-password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
        type="button"
        disabled={ registerBtn }
        data-testid="common_register__button-register"
        onClick={ () => submitRegister() }
      >
        Register

      </button>
      {!isUserValid
      && <p data-testid="common_register__element-invalid_register">{ message }</p>}
    </div>
  );
}

export default Register;
