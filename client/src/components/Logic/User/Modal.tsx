import React from 'react';

import { useActions } from '../../../redux/hooks';

import { IUser } from '../../../types/users.types';
import Button from '../../UI/Button';
import Input from '../../UI/Input';

interface ModalProps {
  user?: IUser;
  closeModal: () => void;
  creating: boolean;
}

const Modal: React.FC<ModalProps> = ({ user, closeModal, creating }) => {
  const [userData, setUserData] = React.useState<IUser>(
    user || { id: Date.now(), name: '', email: '', phone: '' },
  );
  const { addUser, updateUser } = useActions();

  const createUser = (e: Event) => {
    e.preventDefault();
    if (userData.name === '' || userData.email === '' || userData.phone === '')
      return alert('Введите все данные для контакта');
    addUser(userData);
    closeModal();
  };

  React.useEffect(() => {
    if (!creating) {
      updateUser(userData);
    }
  }, [userData]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/10 flex items-center justify-center"
      onClick={closeModal}>
      <div className="bg-white rounded p-5 opacity-100" onClick={(e) => e.stopPropagation()}>
        <form action="submit" className="flex flex-col gap-2">
          <Input
            type="text"
            span="Имя"
            setValue={(e) => setUserData({ ...userData, name: e })}
            value={userData.name}
          />
          <Input
            type="tel"
            span="Телефон"
            setValue={(e) => setUserData({ ...userData, phone: e })}
            value={userData.phone}
          />
          <Input
            type="email"
            span="E-mail"
            setValue={(e) => setUserData({ ...userData, email: e })}
            value={userData.email}
          />
          {creating && (
            <Button
              title="Создать пользователя"
              type="submit"
              classes="bg-green-500 text-white"
              onClick={createUser}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
