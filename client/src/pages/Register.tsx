import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import FormLayout from '../components/Logic/FormLayout';

const Register = () => {
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<{ value: string; reapet: string }>({
    value: '',
    reapet: '',
  });

  const [error, setError] = React.useState('');

  const navigate = useNavigate();
  const register = (e: Event) => {
    e.preventDefault();
    if (password.value !== password.reapet) {
      return setError('Введеные пароли не совпадают');
    }
    axios
      .post('http://localhost:5000/api/auth/register', {
        login: login.trim(),
        password: password.value,
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
    <FormLayout title="Регистрация">
      <form action="submit" className="flex flex-col w-full gap-2">
        <Input
          type="text"
          value={login}
          setValue={setLogin}
          span="Логин"
          placeholder="Придумайте логин"
        />
        <Input
          type="password"
          value={password.value}
          setValue={(e) => setPassword({ ...password, value: e })}
          span="Пароль"
          placeholder="Очень важно придумать надежный пароль!"
        />
        <Input
          type="password"
          value={password.reapet}
          setValue={(e) => setPassword({ ...password, reapet: e })}
          span="Повторите пароль"
        />

        <Button
          title="Войти"
          type="submit"
          onClick={register}
          classes="text-xl bg-sky-500 text-white mt-2"
        />
      </form>
      <p className="text-red-600 text-lg font-semibold">{error}</p>

      <p>
        У вас уже есть аккаунта?{' '}
        <Link to="/login" className="text-bl text-sky-800">
          Войдите!
        </Link>
      </p>
    </FormLayout>
  );
};

export default Register;
