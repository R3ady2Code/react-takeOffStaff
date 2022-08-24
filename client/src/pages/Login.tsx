import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import FormLayout from '../components/Logic/FormLayout';

const Login = () => {
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [error, setError] = React.useState('');

  const navigate = useNavigate();
  const signUp = (e: Event) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/auth/login', {
        login,
        password,
      })
      .then((res) => {
        localStorage.setItem(
          'login',
          JSON.stringify({
            userLogin: true,
            token: res.data.access_token,
            login: res.data.login,
          }),
        );
        setError('');
        navigate('/users');
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <FormLayout title="Авторизация">
      <form action="submit" className="flex flex-col w-full gap-2">
        <Input type="text" value={login} setValue={setLogin} span="Логин" />
        <Input type="password" value={password} setValue={setPassword} span="Пароль" />
        <Button
          title="Войти"
          type="submit"
          onClick={(e: Event) => signUp(e)}
          classes="text-xl bg-sky-500 text-white mt-2"
        />
      </form>
      <p className="text-red-600 text-lg font-semibold">{error}</p>

      <p>
        У вас еще нет аккаунта?{' '}
        <Link to="/register" className="text-bl text-sky-800">
          Зарегистрируйтесь!
        </Link>
      </p>
    </FormLayout>
  );
};

export default Login;
