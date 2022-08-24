import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from './User/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';

interface HeaderProps {
  searchValue: string;
  setSearchValue: (e: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchValue, searchValue }) => {
  const userLogin = JSON.parse(localStorage.getItem('login') || '{}').login;

  const navigate = useNavigate();
  const logOut = (e: Event) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="w-full bg-sky-600 flex items-center justify-between py-2 px-3 fixed">
        <p className="text-white text-xl font-bold">Добро пожаловать, {userLogin}</p>
        <Input
          type="text"
          placeholder="Поиск по имени..."
          value={searchValue}
          setValue={(e) => setSearchValue(e)}
          classes="w-2/5"
        />
        <div>
          <Button
            title="Создать нового пользователя +"
            onClick={() => setShowModal(true)}
            classes="text-xl text-white bg-green-500 mr-2"
          />
          <Button title="Выйти" onClick={logOut} classes="text-xl text-white bg-sky-900" />
        </div>
      </div>
      {showModal && <Modal closeModal={() => setShowModal(false)} creating={true} />}
    </>
  );
};

export default Header;
